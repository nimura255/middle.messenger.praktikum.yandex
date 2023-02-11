import { routes } from '$constants/routes';
import { ChatPage } from '$pages/ChatPage';
import { Fallback404Page } from '$pages/Fallback404Page';
import { Fallback500Page } from '$pages/Fallback500Page';
import { SignInPage } from '$pages/SignInPage';
import { SignUpPage } from '$pages/SignUpPage';
import { ProfilePage } from '$pages/ProfilePage';
import { ProfileEditPage } from '$pages/ProfileEditPage';
import { ProfilePasswordChangePage } from '$pages/ProfilePasswordChangePage';

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
    path: routes.error500,
    block: Fallback500Page,
  },
  {
    path: '/*',
    block: Fallback404Page,
  },
];
