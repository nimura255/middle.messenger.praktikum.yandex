import './styles/styles.pcss';
import { ChatPage } from '$pages/ChatPage';
import { SignUpPage } from '$pages/SignUpPage';
import { SignInPage } from '$pages/SignInPage';
import { Router } from '$core/router';
import { renderDOM } from '$core/renderDOM';

const router = new Router({
  routes: [
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
  ],
});

renderDOM('#app', router);
