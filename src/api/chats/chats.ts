import { HTTPTransport } from '$core/HTTPTransport';
import {
  transformAvatarInChatInfo,
  transformAvatarInChatUserInfo,
} from './utils';
import type {
  AddUsersToChatParams,
  ChatInfo,
  ChatUserInfo,
  ConnectToChatParams,
  ConnectToChatResponse,
  CreateChatParams,
  CreateChatResponse,
  DeleteChatParams,
  DeleteChatResponse,
  DeleteUsersFromChatParams,
  GetChatsParams,
  SearchChatUsersParams,
} from './types';

export const chatsAPI = {
  httpTransport: new HTTPTransport('api/v2/chats'),

  async createChat(params: CreateChatParams) {
    const response = await this.httpTransport.post<CreateChatResponse>(
      '',
      {
        data: params,
      }
    );

    return response.data;
  },
  async getChats(params: GetChatsParams) {
    const response = await this.httpTransport.get<ChatInfo[]>('', {
      data: {
        offset: String(params.offset),
        limit: String(params.limit),
        title: params.title || '',
      },
    });

    return response.data.map(transformAvatarInChatInfo);
  },
  async addUsersToChat(params: AddUsersToChatParams) {
    await this.httpTransport.put<void>('users', {
      data: params,
    });
  },
  async searchChatUsers(params: SearchChatUsersParams) {
    const { chatId, ...data } = params;

    const response = await this.httpTransport.get<ChatUserInfo[]>(
      `${chatId}/users`,
      { data }
    );

    return response.data.map(transformAvatarInChatUserInfo);
  },
  async deleteUsersFromChat(params: DeleteUsersFromChatParams) {
    await this.httpTransport.delete('users', {
      data: params,
    });
  },
  async deleteChat(params: DeleteChatParams) {
    const response = await this.httpTransport.delete<DeleteChatResponse>(
      '',
      {
        data: params,
      }
    );

    return response.data;
  },
  async connectToChat(params: ConnectToChatParams) {
    const response = await this.httpTransport.post<ConnectToChatResponse>(
      `token/${params.chatId}`
    );

    return response.data;
  },
};
