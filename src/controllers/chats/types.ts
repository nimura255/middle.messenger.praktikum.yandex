export type CreateChatParams = {
  title: string;
};

export type GetChatsParams = {
  offset: number;
  limit?: number;
  title?: string;
};

export type AddUserToCharParams = {
  chatId: number;
  username: string;
};

export type DeleteUserFromChatParams = {
  userId: number;
};

export type SelectChatParams = {
  chatId: number;
};

export type UpdateChatLastMessageParams = {
  chatId: number;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageUserId: number;
};

export type UpdateChatNewMessagesCountParams = {
  chatId: number;
  count: number;
};
