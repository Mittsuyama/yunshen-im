import { createSignal, onMount } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import { fetchLoginStatus, tryLoginWithCachedData } from '@/api';
import { useGlobalStore } from '@/data/useGlobalStore';
import { Conv } from './conv';
import { Nav } from './nav';

export const Home = () => {
  const navigate = useNavigate();
  const { globalStore, setGlobalStore } = useGlobalStore();
  const [isLoading, setIsLoading] = createSignal(true);

  /** try to login with cached password */
  onMount(async () => {
    if (globalStore.isLogin) {
      return;
    }

    const cachedData = await tryLoginWithCachedData();
    if (!cachedData) {
      navigate('/login');
      return;
    }

    const loginStatus = await fetchLoginStatus();
    if (!loginStatus) {
      navigate('/login');
    } else {
      setGlobalStore({ isLogin: true })
      setIsLoading(false);
    }
  });

  return (
    <div class="w-full h-full flex">
      {globalStore.isLogin && (
        <>
          <div class="flex-none">
            <Nav />
          </div>
          <div class="flex-1">
            <Conv />
          </div>
        </>
      )}
      {isLoading() && (
        <div class="fixed bg-white w-full min-h-full flex justify-center items-center">
          <i class="text-4xl iconfont icon-loading animate-spin"/>
        </div>
      )}
    </div>
  );
}
