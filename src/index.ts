import { routes } from '$constants/routes';
import { renderDOM } from '$core/renderDOM';
import { Router } from '$core/router';
import { ChatPage } from '$pages/ChatPage';
import { Fallback404Page } from '$pages/Fallback404Page';
import { ProfilePage } from '$pages/ProfilePage';
import { ProfileEditPage } from '$pages/ProfileEditPage';
import { ProfilePasswordChangePage } from '$pages/ProfilePasswordChangePage';
import { SignUpPage } from '$pages/SignUpPage';
import { SignInPage } from '$pages/SignInPage';
import './styles/styles.pcss';

const router = new Router({
  routes: [
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
  ],
});

renderDOM('#app', router);
