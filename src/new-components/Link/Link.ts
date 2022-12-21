import { Block } from '$core/Block';
import type { LinkProps } from './types';
import './styles.pcss';

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props, {
      tagName: 'span',
    });
  }

  render(): string {
    return `
      <a class="mfm-link mfm-typography__text_s" href="{{href}}">
        {{text}}
      </a>
    `;
  }
}
