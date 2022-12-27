import { Block } from '$core/Block';
import { Link as RouterLink } from '$core/router';
import type { LinkProps } from './types';
import './styles.pcss';

export class Link extends Block {
  constructor(props: LinkProps) {
    const routerLink = new RouterLink({
      className: 'mfm-link mfm-typography__text_s',
      path: props.href,
      text: props.text,
    });

    super(
      {
        children: { routerLink },
      },
      {}
    );
  }

  render(): string {
    return '{{{routerLink}}}';
  }
}
