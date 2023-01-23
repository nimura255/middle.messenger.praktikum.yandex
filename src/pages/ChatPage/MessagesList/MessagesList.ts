import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/Block';
import {
  store,
  chatStore,
  type ChatStoreState,
  type Message,
} from '$store';
import { MessageBubble } from '../MessageBubble';

export class MessagesList extends Block {
  constructor() {
    super({}, {});
  }

  renderMessages = (messages: Message[]) => {
    const { user } = store.getState();
    const userId = user?.id;

    const bubbles = messages.map((messageData) => {
      return new MessageBubble({
        messageText: messageData.text,
        time: messageData.time,
        own: userId === messageData.user_id,
        authorName: messageData.authorName,
      });
    });
    const { template: bubblesTemplate, children } =
      makeChildrenFromList(bubbles);

    this.setProps({
      bubblesTemplate,
      children,
    });
  };

  connectToChatStore = (storeState: ChatStoreState) => {
    this.renderMessages(storeState.messages);
  };

  componentDidMount() {
    chatStore.subscribeWithImmediateCall(this.connectToChatStore);
  }

  componentWillUnmount() {
    chatStore.unsubscribe(this.connectToChatStore);
  }

  render(): string {
    return `
    <div class="mfm-chat-page__chat-column__messages-list">
      ${this.props.bubblesTemplate}
    </div>
    `;
  }
}
