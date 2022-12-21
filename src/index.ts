import { SignInPage } from '$pages/SignInPage';
import { renderDOM } from '$core/renderDOM';
import './styles/styles.pcss';

const signInPage = new SignInPage();

renderDOM('#app', signInPage);
