import { routes } from '$constants/routes';
import { ChatPage } from '$pages/ChatPage';
import { SignInPage } from '$pages/SignInPage';
import { SignUpPage } from '$pages/SignUpPage';
import { ProfilePage } from '$pages/ProfilePage';
import { ProfileEditPage } from '$pages/ProfileEditPage';
import { ProfilePasswordChangePage } from '$pages/ProfilePasswordChangePage';
import { Fallback404Page } from '$pages/Fallback404Page';

export const authOnlyRoutes = [
  routes.messenger,
  routes.settings,
  routes.changePassword,
  routes.changeInfo,
];
export const nonAuthOnlyRoutes = [routes.signIn, routes.signUp];

export const routerRoutesList = [
  {
    path: routes.messenger,
    block: ChatPage,
  },
  {
    path: routes.signIn,
    block: SignInPage,
  },
  {
    path: routes.signUp,
    block: SignUpPage,
  },
  {
    path: routes.settings,
    block: ProfilePage,
  },
  {
    path: routes.changeInfo,
    block: ProfileEditPage,
  },
  {
    path: routes.changePassword,
    block: ProfilePasswordChangePage,
  },
  {
    path: '/*',
    block: Fallback404Page,
  },
];
