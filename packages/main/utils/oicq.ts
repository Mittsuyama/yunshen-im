import { ipcMain, BrowserWindow } from 'electron'
import { createClient, Client } from 'oicq';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { store } from '../utils/store';
import getStaticPath from './getStaticPath';

let client: Client | null = null;

const fetchLoginStatus = () => {
  return new Promise((res) => {
    if (!client) {
      res(undefined);
      return;
    }

    const handler = function() {
      res(true);
    };

    setTimeout(() => {
      client?.off('system.online', handler);
      res(false);
    }, 5000);

    client.on('system.online', handler);
  });
};

const fetchGroupList = async () => {
  if (!client) {
    return undefined;
  }
  return client.gl;
};

const tryLoginWithToken = async () => {
  const uid = await store.get('uid');
  if (!uid) {
    return false;
  }
  if (!client) {
    client = createClient(Number(uid));
  }
  await client.login();
  return !!client.status;
};

const fetchQrCode = async () => {
  if (!client) {
    return undefined;
  }
  return new Promise((res) => {
    client!.on('system.login.qrcode', function (e) {
      res(e);
    }).login();
  })
};

const loginWithPassword = async (params: { uid: string, password: string, hashed?: boolean }) => {
  const { uid, password, hashed } = params;

  client = createClient(Number(uid));

  const md5 = crypto.createHash('md5');
  const hashedPassword = hashed ? password : md5.update(password).digest('hex');

  store.set('uid', uid);
  store.set('password', hashedPassword);

  const buffer = Buffer.from(hashedPassword, 'hex');
  client.login(buffer);

  const sliderHandler = (e: any) => {
    const veriWin = new BrowserWindow({
      width: 600,
      height: 400,
      autoHideMenuBar: true,
      webPreferences: {
        nativeWindowOpen: true,
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
    const inject = fs.readFileSync(path.join(getStaticPath(), '/sliderinj.js'), 'utf-8')

    veriWin.webContents.on('did-finish-load', () => {
        veriWin.webContents.executeJavaScript(inject)
    })
    
    veriWin.loadURL(e.url, {
      userAgent: 'Mozilla/5.0 (Linux; Android 7.1.1; MIUI ONEPLUS/A5000_23_17; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045426 Mobile Safari/537.36 V1_AND_SQ_8.3.9_0_TIM_D QQ/3.1.1.2900 NetType/WIFI WebP/0.3.0 Pixel/720 StatusBarHeight/36 SimpleUISwitch/0 QQTheme/1015712',
    })

    veriWin.webContents.on('destroyed', () => {
      client?.off('system.login.slider', sliderHandler);
      client?.login();
    });
  };

  client.on('system.login.slider', sliderHandler);
  
  return true;
};

const tryLoginWithCachedData = async () => {
  const uid = store.get('uid');
  const hasedPassword = store.get('password');
  if (!uid || !hasedPassword) {
    return false;
  }
  return await loginWithPassword({ uid, password: hasedPassword, hashed: true });
};

ipcMain.handle('oicq', async (_event, sign: string, params: any) => {
  switch (sign) {
    case 'fetchLoginStatus':
      return await fetchLoginStatus();
    case 'fetchGroupList':
      return await fetchGroupList();
    case 'tryLoginWithToken':
      return await tryLoginWithToken();
    case 'fetchQrCode':
      return await fetchQrCode();
    case 'loginWithPassword':
      return await loginWithPassword(params);
    case 'tryLoginWithCachedData':
      return await tryLoginWithCachedData();
  }
});
