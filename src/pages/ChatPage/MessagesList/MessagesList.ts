import { Button } from '$components/Button';
import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/Block';
import {
  store,
  chatStore,
  type ChatStoreState,
  type Message,
} from '$store';
import { MessageBubble } from '../MessageBubble';
import type { MessagesListProps } from './types';

export class MessagesList extends Block {
  memoizedMessages: ChatStoreState['messages'] | undefined;
  memoizedHasLoadedAllOldMessages: boolean | undefined;
  loadPrevButton: Button;
  scrollPosition = 0;

  constructor(props: MessagesListProps) {
    const loadPrevButton = new Button({
      text: 'load previous messages',
      type: 'button',
      variant: 'inline',
      events: { click: props.onLoadPrev },
    });

    const handleScrollChange = (event: Event) => {
      const target = event.target as HTMLElement;

      this.scrollPosition = target.scrollTop;
    };

    super(
      {
        ...props,
        showLoadPrevButton: false,
        children: { loadPrevButton },
        events: {
          scroll: handleScrollChange,
        },
      },
      {}
    );

    this.loadPrevButton = loadPrevButton;
  }

  getChildrenToRenderFromMessages = (messages: Message[]) => {
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

    return {
      bubblesTemplate,
      children,
    };
  };

  connectToChatStore = (storeState: ChatStoreState) => {
    const { messages, hasLoadedAllOldMessages } = storeState;

    if (
      messages === this.memoizedMessages &&
      hasLoadedAllOldMessages === this.memoizedHasLoadedAllOldMessages
    ) {
      return;
    }

    this.memoizedHasLoadedAllOldMessages = hasLoadedAllOldMessages;
    this.memoizedMessages = messages;

    const { bubblesTemplate, children } =
      this.getChildrenToRenderFromMessages(messages);

    this.setProps({
      ...this.props,
      bubblesTemplate,
      showLoadPrevButton: !hasLoadedAllOldMessages && messages.length,
      children: {
        ...this.children,
        ...children,
      },
    });
  };

  componentDidMount() {
    chatStore.subscribeWithImmediateCall(this.connectToChatStore);
  }

  componentWillUnmount() {
    chatStore.unsubscribe(this.connectToChatStore);
  }

  componentDidUpdate(
    oldProps: MessagesListProps,
    newProps: MessagesListProps
  ) {
    if (oldProps.onLoadPrev !== newProps.onLoadPrev) {
      this.loadPrevButton.setProp('events', {
        click: newProps.onLoadPrev,
      });
    }

    this.element?.scrollTo(0, this.scrollPosition);
  }

  render(): string {
    return `
    <div class="mfm-chat-page__chat-column__messages-list">
      ${this.props.bubblesTemplate}
      {{#if showLoadPrevButton}}
        <div class="mfm-chat-page__chat-column__messages-list__load-prev-button-wrapper">
          {{{loadPrevButton}}}
        </div>
      {{/if}}
    </div>
    `;
  }
}
