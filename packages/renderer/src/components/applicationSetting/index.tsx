import { useNavigate } from 'solid-app-router';
import { useGlobalStore } from '@/data/useGlobalStore';
import { clearUidAndPassword } from '@/api';

export const ApplicationSetting = () => {
  const navigate = useNavigate();
  const { setGlobalStore } = useGlobalStore();

  const handleLogout = async () => {
    await clearUidAndPassword();
    setGlobalStore({ isLogin: false });
    navigate('/login');
  };

  return (
    <div
      class="p-4 m-4 bg-primary-500 hover:bg-primary-600 rounded-md text-center text-secondary-50"
      onClick={() => handleLogout()}
    >
      LOGOUT
    </div>
  );
};