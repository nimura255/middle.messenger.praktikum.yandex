import { type BaseProps } from '$core/Block';

export type ChatsListItemProps = BaseProps & {
  active?: boolean;
  chatName: string;
  lastMessage: string;
  lastMessageTime: string;
  newMessagesCount?: number;
  isLastMessageOwn?: boolean;
  image?: string;
};
