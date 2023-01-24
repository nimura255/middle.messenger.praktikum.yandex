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

export type SearchCurrentChatUsersParams = {
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type DeleteUserFromChatParams = {
  userId: number;
};

export type SelectChatParams = {
  chatId: number;
};
