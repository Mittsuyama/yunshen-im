import { createStore } from 'solid-js/store';

interface GlobalStore {
  isLogin: boolean;
  uid: string;
}

const intialState: GlobalStore = {
  isLogin: false,
  uid: '',
};

export const useGlobalStore = () => {
  const [store, setStore] = createStore(intialState);

  return {
    globalStore: store,
    setGlobalStore: setStore,
  }
};
