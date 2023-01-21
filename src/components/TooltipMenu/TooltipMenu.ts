import { Block, makeChildrenFromList } from '$core/Block';
import { TooltipMenuItem } from './TooltipMenuItem';
import type { TooltipMenuProps } from './types';
import './styles.pcss';

export class TooltipMenu extends Block {
  constructor(props: TooltipMenuProps) {
    const { items } = props;
    const itemsBlocks = items.map((params) => new TooltipMenuItem(params));
    const { children, template } = makeChildrenFromList(itemsBlocks);

    super({ template, children }, {});
  }

  render() {
    return `
      <div class="mfm-tooltip-menu">
        ${this.props.template}
      </div>
    `;
  }
}
