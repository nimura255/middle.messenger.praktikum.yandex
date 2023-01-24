import { Block } from '$core/Block';
import { Avatar } from '$components/Avatar';
import { Counter } from '$components/Counter';
import { appController } from '$controllers/app';
import { chatsController } from '$controllers/chats';
import { store, type StoreState } from '$store';
import { formatMessageDateString } from '$utils/date';
import type { ChatsListItemProps } from './types';
import './styles.pcss';

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {
    const avatar = new Avatar({ src: props.image || '' });
    const counter = new Counter({ value: props.newMessagesCount || 0 });

    const propsWithChildren = {
      ...props,
      lastMessageTime: props.lastMessageTime
        ? formatMessageDateString(props.lastMessageTime)
        : undefined,
      isActive: false,
      children: {
        avatar,
        counter,
      },
      events: {
        click: async () => {
          appController.setLoadingSpinnerStatus(true);
          await chatsController.selectChat({ chatId: props.id });
          appController.setLoadingSpinnerStatus(false);
        },
      },
    };

    super(propsWithChildren, {});
  }

  private connectToStore = (storeState: Partial<StoreState>) => {
    const isActive = storeState.currentChatId === this.props.id;

    if (this.props.isActive !== isActive) {
      this.setProp('isActive', isActive);
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
      <button class="mfm-chats-list-item {{#if isActive}}mfm-chats-list-item_active{{/if}}">
        {{{avatar}}}

        <div class="mfm-chats-list-item__description">
          <div class="mfm-chats-list-item__description__title-row">
             <p class="mfm-chats-list-item__description__title-row__chat-name mfm-typography__text_l">
                {{chatName}}
             </p>
             {{#if lastMessageTime}}
               <p class="mfm-chats-list-item__description__title-row__time mfm-typography__text_s">
                  {{lastMessageTime}}
               </p>
             {{/if}}
          </div>

          {{#if lastMessage}}
            <div class="mfm-chats-list-item__description__message-row">
              <div class="mfm-chats-list-item__description__message-row__message-content mfm-typography__text_m">
                {{#if isLastMessageOwn}}
                  <p class="mfm-chats-list-item__description__message-row__message-content__prefix">
                    You:&nbsp;
                  </p>
                {{/if}}

                <p class="mfm-chats-list-item__description__message-row__message-content__text">
                  {{lastMessage}}
                </p>
              </div>

              {{#if newMessagesCount}}
                {{{counter}}}
              {{/if}}
            </div>
          {{/if}}
        </div>
      </button>
    `;
  }
}
