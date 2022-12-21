import { Block } from '$core/Block';
import type { ButtonProps } from './types';
import './styles.pcss';

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props, {});
  }

  render(): string {
    return `
      <button
        class="mfm-button mfm-button_{{#if variant}}{{variant}}{{else}}primary{{/if}} mfm-typography__text_s"
        type="{{type}}"
      >
        {{text}}
      </button>
    `;
  }
}
