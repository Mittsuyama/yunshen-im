import { createSignal, createEffect, batch, onCleanup } from 'solid-js';
import { useNavigate } from 'solid-app-router';
import {
  setStoredUid,
  fetchStoredUid,
  fetchLoginStatus,
  loginWithPassword,
} from '@/api';
import { useGlobalStore } from '@/data/useGlobalStore';

const setUserAgent = (window: any) => {
  const userAgent = 'Mozilla/5.0 (Linux; Android 7.1.1; MIUI ONEPLUS/A5000_23_17; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045426 Mobile Safari/537.36 V1_AND_SQ_8.3.9_0_TIM_D QQ/3.1.1.2900 NetType/WIFI WebP/0.3.0 Pixel/720 StatusBarHeight/36 SimpleUISwitch/0 QQTheme/1015712';

  if (window.navigator.userAgent != userAgent) {
    var userAgentProp = {
      get: function() {
        return userAgent;
      }
    };
    try {
      Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
    } catch (e) {
      window.navigator = Object.create(navigator, {
        userAgent: userAgentProp
      });
    }
  }
};

export const LoginWithPassword = () => {
  const navigate = useNavigate();
  const { setGlobalStore } = useGlobalStore();
  const [isFocus, setIsFocus] = createSignal(false);
  const [isPasswordFocus, setIsPasswordFocus] = createSignal(false);
  const [uidValue, setUidValue] = createSignal('');
  const [passwordValue, setPasswordValue] = createSignal('');
  const [inputError, setInputError] = createSignal('');

  const validateError = (v: string) => {
    return /[^0-9]/g.test(v);
  };

  const handleSubmit = async () => {
    if (!uidValue()) {
      setInputError('Empty');
      return;
    }
    setStoredUid({ uid: uidValue() });
    setGlobalStore({  uid: uidValue() });
    loginWithPassword(uidValue(), passwordValue());
  };

  createEffect(() => {
    const interval = window.setInterval(async () => {
      const res = await fetchLoginStatus();
      if (res) {
        setGlobalStore({ isLogin: true });
        navigate('/');
      }
    }, 1000);
    onCleanup(() => window.clearInterval(interval));
  });

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

        {/** password input */}
        <div class="w-full flex items-end">
          <div class="flex-none w-24">Password</div>
          <div class={`
            w-full h-10 p-1 mt-6 duration-300 border-b-2 relative flex
            ${isPasswordFocus() ? 'border-b-gray-600' : 'border-b-gray-200'}
          `}>
            <input
              name="id"
              type="password"
              class="border-0 outline-none w-full h-full flex-1"
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
              value={passwordValue()}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                  return;
                }
                setPasswordValue(e.currentTarget.value);
              }}
            />
          </div>
        </div>


        {/* submit button */}
        <button
          onClick={() => handleSubmit()}
          class="text-white w-full py-4 rounded-sm text-lg mt-10 bg-primary-500 hover:bg-primary-600 duration-300"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};