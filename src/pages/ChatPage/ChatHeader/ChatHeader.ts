import { Block } from '$core/Block';
import { Avatar } from '$components/Avatar';
import { IconButton } from '$components/IconButton';
import { verticalDotsIcon } from '$iconsTemplates';

export class ChatHeader extends Block {
  constructor() {
    const avatar = new Avatar({ src: '' });
    const dotsButton = new IconButton({
      iconTemplate: verticalDotsIcon,
    });
    const chatName = 'Lorem ipsum dolor sit amet, consectetur';

    const propsWithChildren = {
      children: {
        avatar,
        dotsButton,
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
