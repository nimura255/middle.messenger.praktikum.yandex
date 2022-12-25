import { SignUpPage } from '$pages/SignUpPage';
import { renderDOM } from '$core/renderDOM';
import './styles/styles.pcss';

const signUpPage = new SignUpPage();

renderDOM('#app', signUpPage);
