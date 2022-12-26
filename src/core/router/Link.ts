import { Block } from '$core/Block';
import type { LinkProps } from './types';

export class Link extends Block {
  constructor(props: LinkProps) {
    const href = window.location.origin + props.path;

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      const currentPath = window.location.pathname;

      window.history.pushState({}, '', href);

      const popStateEvent = new PopStateEvent('popstate', {
        state: {
          currentPath,
          newPath: props.path,
        },
      });
      dispatchEvent(popStateEvent);
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
        {{slot}}
      </a>
    `;
  }
}
