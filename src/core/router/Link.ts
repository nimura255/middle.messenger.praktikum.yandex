import { Block } from '$core/Block';
import { navigate } from './navigate';
import type { LinkProps } from './types';

export class Link extends Block {
  constructor(props: LinkProps) {
    const href = window.location.origin + props.path;

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      navigate(props.path);
    };

    const innerProps = {
      ...props,
      href,
      events: {
        click: handleClick,
      },
    };

    super(innerProps, {});
  }

  render(): string {
    return `
      <a class="{{className}}" href="{{path}}">
        {{text}}
        {{{slot}}}
      </a>
    `;
  }
}
