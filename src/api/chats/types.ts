export type CreateChatParams = {
  title: string;
};

export type CreateChatResponse = {
  id: number;
};

export type GetChatsParams = {
  offset: number;
  limit?: number;
  title?: string;
};

export type ChatInfo = {
  created_by: number;
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: Nullable<ChatLastMessageInfo>;
};

type ChatLastMessageInfo = {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  };
  time: string;
  content: string;
};

export type AddUsersToChatParams = {
  users: number[];
  chatId: number;
};

export type SearchChatUsersParams = {
  chatId: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type ChatUserInfo = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
};

export type DeleteUsersFromChatParams = {
  users: number[];
  chatId: number;
};

export type DeleteChatParams = {
  chatId: number;
};

export type DeleteChatResponse = {
  result: {
    id: number;
    title: string;
    avatar: Nullable<string>;
    created_by: number;
  };
  userId: number;
};

export type ConnectToChatParams = {
  chatId: number;
};

export type ConnectToChatResponse = {
  token: string;
};
