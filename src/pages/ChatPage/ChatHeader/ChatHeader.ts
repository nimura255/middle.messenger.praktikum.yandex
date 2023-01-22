import { Avatar } from '$components/Avatar';
import { IconButton } from '$components/IconButton';
import { Tooltip } from '$components/Tooltip';
import { Block } from '$core/Block';
import { verticalDotsIcon } from '$iconsTemplates';
import { DotsTooltipContent } from './DotsTooltipContent';

export class ChatHeader extends Block {
  constructor() {
    const avatar = new Avatar({ src: '' });
    const dotsButton = new IconButton({
      iconTemplate: verticalDotsIcon,
      shape: 'circle',
    });
    const tooltip = new Tooltip({
      trigger: dotsButton,
      content: new DotsTooltipContent(),
    });

    const chatName = 'Lorem ipsum dolor sit amet, consectetur';

    const propsWithChildren = {
      children: {
        avatar,
        dotsButton: tooltip,
      },
    };

    super(propsWithChildren, {});
    this.setState({ chatName });
  }

  render(): string {
    return `
      <div class="mfm-chat-page__chat-column__header">
        <div class="mfm-chat-page__chat-column__header__info">
          {{{avatar}}}
          <p class="mfm-chat-page__chat-column__header__info__chat-name mfm-typography__text_l">
            ${this.state.chatName}
          </p>
        </div>

        {{{dotsButton}}}
      </div>
    `;
  }
}
