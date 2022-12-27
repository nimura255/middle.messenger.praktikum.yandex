import { Block, type BaseProps } from '$core/Block';

export class MessageInput extends Block {
  constructor(props: BaseProps) {
    super(props, {});
  }

  render(): string {
    return `
      <input
        name="message"
        class="mfm-chat-page__chat-column__message-input-form__input mfm-typography__text_m"
        placeholder="Input message here"
      />
    `;
  }
}
