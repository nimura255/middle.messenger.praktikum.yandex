import { Block } from '$core/Block';
import type { TooltipMenuItemProps } from './types';

export class TooltipMenuItem extends Block {
  constructor(props: TooltipMenuItemProps) {
    super(
      {
        iconTemplate: props.iconTemplate,
        name: props.name,
        events: props.events,
      },
      {}
    );
  }

  render() {
    return `
      <button class="mfm-tooltip-menu-item">
        ${this.props.iconTemplate}
        <p class="mfm-tooltip-menu-item__name mfm-typography__text_s">
          {{{name}}}
        </p>
      </button>
    `;
  }
}
