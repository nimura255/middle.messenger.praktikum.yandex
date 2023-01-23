import { type BaseProps } from '$core/Block';

export type ChatsListItemProps = BaseProps & {
  id: number;
  chatName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  newMessagesCount?: number;
  isLastMessageOwn?: boolean;
  image?: string;
};
