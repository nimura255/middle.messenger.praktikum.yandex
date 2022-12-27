import { Block } from '$core/Block';
import { arrowRightIcon } from '$iconsTemplates';
import type { ArrowButtonProps } from './types';
import './styles.pcss';

export class ArrowButton extends Block {
  constructor(props: ArrowButtonProps) {
    super(props, {});
  }

  render(): string {
    return `
      <button
      class="mfm-arrow-button mfm-arrow-button_{{#if direction}}{{direction}}{{else}}right{{/if}}"
      type="{{#if type}}{{type}}{{else}}button{{/if}}"
      >
        ${arrowRightIcon}
      </button>
    `;
  }
}
