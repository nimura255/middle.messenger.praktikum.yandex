import { Block } from '$core/Block';
import type { IconButtonProps } from './types';
import './styles.pcss';

export class IconButton extends Block {
  constructor(props: IconButtonProps) {
    super(props, {});
  }

  render() {
    const { color, full, iconTemplate, shape, size } = this.props;

    const className = [
      'mfm-icon-button',
      full ? 'mfm-icon-button_full' : '',
      shape ? `mfm-icon-button_${shape}` : '',
    ].join(' ');
    const style = [
      color ? `color: ${color}` : '',
      size ? `width: ${size}; height: ${size}` : '',
    ].join('; ');

    return `
      <button class="${className}" style="${style}">
        ${iconTemplate}
      </button>
    `;
  }
}
