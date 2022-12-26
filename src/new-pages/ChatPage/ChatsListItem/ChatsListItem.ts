import { Block } from '$core/Block';
import { Avatar } from '$components/Avatar';
import { Counter } from '$components/Counter';
import type { ChatsListItemProps } from './types';
import './styles.pcss';

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {
    const avatar = new Avatar({ src: props.image || '' });
    const counter = new Counter({ value: props.newMessagesCount || 0 });

    const propsWithChildren = {
      ...props,
      children: {
        avatar,
        counter,
      },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <button class="mfm-chats-list-item {{#if active}}mfm-chats-list-item_active{{/if}}">
        {{{avatar}}}

        <div class="mfm-chats-list-item__description">
          <div class="mfm-chats-list-item__description__title-row">
             <p class="mfm-chats-list-item__description__title-row__chat-name mfm-typography__text_l">
                {{chatName}}
             </p>
             <p class="mfm-chats-list-item__description__title-row__time mfm-typography__text_s">
                {{lastMessageTime}}
             </p>
          </div>

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
        </div>
      </button>
    `;
  }
}
