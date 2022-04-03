/**
 * Example of 'electron-store' usage.
 */
import { ipcMain } from 'electron'
import Store from 'electron-store'

/**
 * Expose 'electron-store' to Renderer-process through 'ipcMain.handle'
 */
export const store = new Store() as any;
ipcMain.handle(
  'electron-store',
  async (_evnet, methodSign: string, ...args: any[]) => {
    if (typeof store[methodSign] === 'function') {
      return store[methodSign](...args)
    }
    return store[methodSign]
  }
)
