import { Block } from '$core/Block';
import { doubleCheckMarkIcon } from '$iconsTemplates';
import type { MessageBubbleProps } from './types';
import './style.pcss';

export class MessageBubble extends Block {
  constructor(props: MessageBubbleProps) {
    super(props, {});
  }

  render(): string {
    return `
      <div class="mfm-message-bubble {{#if own}}mfm-message-bubble_own{{/if}}">
        {{#if imageSrc}}
          <img
            class="mfm-message-bubble__image"
            src="{{imageSrc}}" alt="message image"
          />
        {{/if}}

        <div class="mfm-message-bubble__inner">
          {{#if messageText}}
            <p class="mfm-message-bubble__inner__message-text mfm-typography__text_m">
              {{messageText}}
            </p>
          {{/if}}

          <div class="mfm-message-bubble__inner__meta-data">
            {{#if seen}}
              ${doubleCheckMarkIcon}
            {{/if}}

            <p class="mfm-typography__text_xs">
              {{time}}
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
