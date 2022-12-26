import './styles/styles.pcss';
import { ChatPage } from '$pages/ChatPage';
import { renderDOM } from '$core/renderDOM';

const chatPage = new ChatPage();

renderDOM('#app', chatPage);
