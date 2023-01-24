export type Message = {
  id: string;
  time: string;
  user_id: number;
  text: string;
  authorName?: string;
};

export type ChatUser = {
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

export type ChatStoreState = {
  hasLoadedAllOldMessages: boolean;
  messages: Message[];
  users: ChatUser[];
};
