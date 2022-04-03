const oicq = {
  async send(key: string, params?: any) {
    const { invoke } = window.ipcRenderer
    return await invoke('oicq', key, params);
  },
};

export { oicq };
