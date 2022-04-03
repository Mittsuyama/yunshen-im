import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { useNavigate } from "solid-app-router";
import { fetchQrCode, fetchLoginStatus } from '@/api';
import { useGlobalStore } from '@/data/useGlobalStore';

export const QrCodePage = () => {
  const navigate = useNavigate();
  const { setGlobalStore } = useGlobalStore();
  const [qrBuffer, setQrBuffer] = createSignal<Uint8Array | null>(null);
  const [countDown , setCountDown] = createSignal(0);

  createEffect(() => {
    const interval = window.setInterval(() => {
      if (countDown() > 0) {
        setCountDown(countDown() - 1);
      }
    }, 1000);
    onCleanup(() => window.clearInterval(interval));
  });

  const refreshQrCode = async () => {
    const res = await fetchQrCode();
    if (res.image) {
      setQrBuffer(res.image);
      setCountDown(120);
    }
  };

  createEffect(() => {
    const interval = window.setInterval(async () => {
      const status = await fetchLoginStatus();
      console.log('status', status);
      if (status) {
        setGlobalStore({ isLogin: true });
        navigate('/');
      }
    }, 500);
    onCleanup(() => window.clearInterval(interval));
  });

  createEffect(async () => {
    if (countDown() === 0) {
      await refreshQrCode();
    }
  });

  return (
    <div class="w-full h-full flex flex-col">
      <header class="h-10 flex-none text-gray-700 pl-3 flex items-center">
        <div
          class="py-1 px-2 hover:bg-gray-100 rounded-md cursor-pointer"
          onClick={() => navigate('/login')}
        >
          <i class="iconfont icon-back text-2xl"/>
        </div>
      </header>
      <main class="flex-1 flex flex-col justify-center items-center">
        {qrBuffer() && (
          <div class="p-4 border-4 border-sky-600 rounded-2xl">
            <img
              class="w-48 h-48"
              src={window.URL.createObjectURL(new Blob([qrBuffer()!], { type: 'image/png' }))}
            />
          </div>
        )}
        <div class="mt-10 text-gray-400">
          QR Code refresh automatical after
          <span class="text-gray-500 mx-2">
            {countDown()}
          </span>
        seconds.
        </div>
        <div class="mt-5 hover:text-sky-600 cursor-pointer" onClick={() => refreshQrCode()}>
          Refresh
        </div>
      </main>
    </div>
  );
};
