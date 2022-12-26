import { Block } from '$core/Block';
import { Link } from '$components/Link';
import type { ListItemProps } from './types';

export class ListItem extends Block {
  constructor(props: ListItemProps) {
    const link = new Link({
      href: props.path,
      text: props.name,
    });

    const propsWithChildren = {
      ...props,
      children: { link },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <li>
        {{{link}}}
      </li>
    `;
  }
}
