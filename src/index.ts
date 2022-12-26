import './styles/styles.pcss';
import { ChatPage } from '$pages/ChatPage';
import { SignUpPage } from '$pages/SignUpPage';
import { SignInPage } from '$pages/SignInPage';
import { renderDOM } from '$core/renderDOM';

const chatPage = new ChatPage();
const signInPage = new SignInPage();
const signUpPage = new SignUpPage();

const pagesRecord = {
  char: chatPage,
  signIn: signInPage,
  signUp: signUpPage,
};

renderDOM('#app', pagesRecord.signIn);
