import { createSignal, createEffect, batch, resetErrorBoundaries } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import {
  setStoredUid,
  fetchStoredUid,
  fetchLoginStatus,
} from '@/api';
import { useGlobalStore } from '@/data/useGlobalStore';

export const Login = () => {
  const navigate = useNavigate();
  const { setGlobalStore } = useGlobalStore();
  const [isFocus, setIsFocus] = createSignal(false);
  const [uidValue, setUidValue] = createSignal('');
  const [inputError, setInputError] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);

  const validateError = (v: string) => {
    return /[^0-9]/g.test(v);
  };

  const handleSubmit = async () => {
    if (!uidValue()) {
      setInputError('Empty');
      return;
    }
    setStoredUid({ uid: uidValue() });
    batch(() => {
      setGlobalStore({  uid: uidValue() });
      setIsLoading(true);
    })

    /** login request */
    const loginStatus = await fetchLoginStatus();
    /** go to scaning qr code */
    if (!loginStatus) {
      navigate('/qrCode');
    }
  };

  /** try to get cached uid */
  createEffect(async () => {
    const { uid } = await fetchStoredUid();
    if (uid) {
      setUidValue(uid);
    }
  });

  /** validate uid input */
  createEffect(() => {
    setInputError(validateError(uidValue()) ? 'Number only' : '');
  });

  return (
    <div class="w-full h-full flex justify-center items-center">
      <div class="w-96">
        <div class="font-bold text-lg">Your Account</div>
        <div class="text-gray-300 mt-4 text-m">Please enter your ID and Password.</div>

        {/** id input */}
        <div class="w-full flex items-end">
          <div class="flex-none w-24">ID</div>
          <div class={`
            w-full h-10 p-1 mt-6 duration-300 border-b-2 relative flex
            ${inputError() ? 'border-b-red-500' : isFocus() ? 'border-b-gray-600' : 'border-b-gray-200'}
          `}>
            <input
              name="id"
              class={`border-0 outline-none w-full h-full flex-1 ${inputError() ? 'text-red-500' : ''}`}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              value={uidValue()}
              onKeyUp={(e) => setUidValue(e.currentTarget.value)}
            />
            <div class={`
              absolute -bottom-6 left-0 text-red-400 text-sm duration-300
              ${inputError() ? '' : 'opacity-0'}
            `}>
              {inputError()}
            </div>
          </div>
        </div>

        {/* submit button */}
        <button
          onClick={() => handleSubmit()}
          class="text-white w-full py-4 rounded-sm text-lg mt-10 bg-sky-500 hover:bg-sky-600 duration-300"
        >
          LOGIN
        </button>
      </div>

      {/* login loading */}
      {isLoading() && (
        <div class="fixed bg-white w-full min-h-full flex justify-center items-center">
          <i class="text-2xl iconfont icon-loading"/>
        </div>
      )}
    </div>
  );
};
