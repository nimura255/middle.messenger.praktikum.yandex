import { Avatar } from '$components/Avatar';
import { IconButton } from '$components/IconButton';
import { Tooltip } from '$components/Tooltip';
import { Block } from '$core/Block';
import { verticalDotsIcon } from '$iconsTemplates';
import { store, type StoreState } from '$store';
import { DotsTooltipContent } from './DotsTooltipContent';

export class ChatHeader extends Block {
  avatar: Avatar;
  avatarSrc = '';
  chatName = '';

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

    const propsWithChildren = {
      children: {
        avatar,
        dotsButton: tooltip,
      },
    };

    super(propsWithChildren, {});

    this.avatar = avatar;
  }

  private connectToStore = (storeState: Partial<StoreState>) => {
    const { currentChatId, chats } = storeState;
    let newAvatarSrc = '';
    let newChatName = '';

    if (currentChatId && chats) {
      const currentChat = chats.find((chat) => chat.id === currentChatId);

      newAvatarSrc = currentChat?.image || '';
      newChatName = currentChat?.chatName || '';
    }

    if (newAvatarSrc !== this.avatarSrc) {
      this.avatar.setProp('src', newAvatarSrc);
      this.avatarSrc = newAvatarSrc;
    }

    if (newChatName !== this.chatName) {
      this.chatName = newChatName;
      this.setProp('chatName', newChatName);
    }
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
  }

  render(): string {
    return `
      <div class="mfm-chat-page__chat-column__header">
        <div class="mfm-chat-page__chat-column__header__info">
          {{{avatar}}}
          <p class="mfm-chat-page__chat-column__header__info__chat-name mfm-typography__text_l">
            {{chatName}}
          </p>
        </div>

        {{{dotsButton}}}
      </div>
    `;
  }
}
