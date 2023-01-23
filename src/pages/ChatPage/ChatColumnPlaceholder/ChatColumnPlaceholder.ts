import { Block } from '$core/Block';

export class ChatColumnPlaceholder extends Block {
  constructor() {
    super({}, {});
  }

  render() {
    return `
      <main class="mfm-chat-page__placeholder">
        <p class="mfm-typography__text_m">
          Select a chat to start messaging
        </p>
      </main>
    `;
  }
}
