import { Block } from '$core/Block';
import type { MessageFormActionButtonProps } from './types';
import './styles.pcss';

export class MessageFormActionButton extends Block {
  constructor(props: MessageFormActionButtonProps) {
    super(props, {});
  }

  render(): string {
    return `
      <button
        class="message-form-action-button"
        type="button"
      >
        ${this.props.iconTemplate}
      </button>
    `;
  }
}
