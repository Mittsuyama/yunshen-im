import { store } from './store';
import { oicq } from './oicq';

export const fetchStoredUid = async (): Promise<{ uid?: string }> => {
  const uid = await store.get('uid');
  return {
    uid,
  };
};

export const setStoredUid = async ({ uid }: { uid: string }) => {
  await store.set('uid', uid);
};

export const clearUidAndPassword = async () => {
  await Promise.all([
    store.set('uid', ''),
    store.set('password', ''),
  ]);
};

export const fetchLoginStatus = async () => {
  return await oicq.send('fetchLoginStatus');
};

export const fetchQrCode = async () => {
  return await oicq.send('fetchQrCode');
};

export const fetchGroupList = async () => {
  return await oicq.send('fetchGroupList');
};

export const tryLoginWithToken = async (): Promise<boolean> => {
  return await oicq.send('tryLoginWithToken');
};

export const loginWithPassword = async (uid: string, password: string) => {
  return await oicq.send('loginWithPassword', { uid, password });
};

export const tryLoginWithCachedData = async () => {
  return await oicq.send('tryLoginWithCachedData');
};
