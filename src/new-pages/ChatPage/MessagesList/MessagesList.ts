import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/makeChildrenFromList';
import { MessageBubble } from '../MessageBubble';
import { mockMessages } from './constants';

export class MessagesList extends Block {
  constructor() {
    const bubbles = mockMessages.map((messageData) => {
      return new MessageBubble(messageData);
    });

    const { template: bubblesTemplate, children } =
      makeChildrenFromList(bubbles);

    super({ children }, {});

    this.setState({ bubblesTemplate });
  }

  render(): string {
    return `
    <div class="mfm-chat-page__chat-column__messages-list">
      <p class="mfm-chat-page__chat-column__messages-list__day-marker mfm-typography__text_m">
        Today
      </p>
      ${this.state.bubblesTemplate}
    </div>
    `;
  }
}
