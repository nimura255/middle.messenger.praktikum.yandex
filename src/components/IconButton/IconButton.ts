import { Block } from '$core/Block';
import type { IconButtonProps } from './types';
import './styles.pcss';

export class IconButton extends Block {
  constructor(props: IconButtonProps) {
    super(props, {});
  }

  render(): string {
    return `
      <button class="mfm-icon-button">
        ${this.props.iconTemplate}
      </button>
    `;
  }
}
