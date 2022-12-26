import { Block } from '$core/Block';
import type { AvatarProps } from './types';
import './styles.pcss';

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props, {});
  }

  render(): string {
    return `
      <div
        class="mfm-avatar"
        style="background-image: url(${this.props.src})"
      >
      </div>
    `;
  }
}
