import { renderDOM } from '$core/renderDOM';
import { Router } from '$core/router';
import { ChatPage } from '$pages/ChatPage';
import { Fallback404Page } from '$pages/Fallback404Page';
import { Fallback500Page } from '$pages/Fallback500Page';
import { ProfilePage } from '$pages/ProfilePage';
import { ProfileEditPage } from '$pages/ProfileEditPage';
import { ProfilePasswordChangePage } from '$pages/ProfilePasswordChangePage';
import { RootPage } from '$pages/RootPage';
import { SignUpPage } from '$pages/SignUpPage';
import { SignInPage } from '$pages/SignInPage';
import './styles/styles.pcss';

const router = new Router({
  routes: [
    {
      path: '/',
      blockCreator: () => new RootPage(),
    },
    {
      path: '/chat',
      blockCreator: () => new ChatPage(),
    },
    {
      path: '/signIn',
      blockCreator: () => new SignInPage(),
    },
    {
      path: '/signUp',
      blockCreator: () => new SignUpPage(),
    },
    {
      path: '/profile',
      blockCreator: () => new ProfilePage(),
    },
    {
      path: '/profile/changeInfo',
      blockCreator: () => new ProfileEditPage(),
    },
    {
      path: '/profile/changePassword',
      blockCreator: () => new ProfilePasswordChangePage(),
    },
    {
      path: '/404',
      blockCreator: () => new Fallback404Page(),
    },
    {
      path: '/500',
      blockCreator: () => new Fallback500Page(),
    },
  ],
});

renderDOM('#app', router);
