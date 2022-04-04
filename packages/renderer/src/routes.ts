import { lazy } from 'solid-js';
import type { RouteDefinition } from 'solid-app-router';
import { Home } from '@/pages/home';
import { QrCodePage } from '@/pages/login/qrCodePage';
import { LoginWithPassword } from '@/pages/login/loginWithPassword';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: LoginWithPassword,
  },
  {
    path: '/qrCode',
    component: QrCodePage,
  },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
