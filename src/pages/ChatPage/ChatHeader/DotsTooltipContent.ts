import { Block } from '$core/Block';
import { TooltipMenu } from '$components/TooltipMenu';
import {
  circledCrossIcon,
  circledPlusIcon,
  leaveIcon,
} from '$iconsTemplates';

export class DotsTooltipContent extends Block {
  constructor() {
    const menu = new TooltipMenu({
      items: [
        {
          name: 'Add user',
          iconTemplate: circledPlusIcon,
        },
        {
          name: 'Delete user',
          iconTemplate: circledCrossIcon,
        },
        {
          name: 'Leave chat',
          iconTemplate: leaveIcon,
        },
      ],
    });

    super({ children: { menu } }, {});
  }

  render() {
    return '{{{menu}}}';
  }
}
