export enum SocketMessageType {
  File = 'file',
  GetOld = 'get old',
  Message = 'message',
  Pong = 'pong',
  Ping = 'ping',
  UserConnected = 'user connected',
}

export type SocketMessage = {
  type: SocketMessageType;
  content: string;
};

export type SocketChatMessage = SocketMessage & {
  id: string;
  time: string;
  user_id: number;
};

export type MessageEventListener = (event: MessageEvent<string>) => void;

export type ConnectToCurrentChatParams = {
  userId: number;
  chatId: number;
  token: string;
};

export type SendMessageParams = {
  text: string;
};
