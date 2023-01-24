export type StoreState = {
  user: {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  };
  showLoadingSpinner: boolean;
  chats: ChatInfo[];
  currentChatId?: number;
  currentChatToken?: string;
};

export type ChatInfo = {
  id: number;
  chatName: string;
  lastMessage?: string;
  lastMessageTime?: string;
  newMessagesCount?: number;
  isLastMessageOwn?: boolean;
  image?: string;
  creatorId: number;
};
