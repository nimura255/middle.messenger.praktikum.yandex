import { chatsAPI, type ChatInfo as ChatInfoFromAPI } from '$api/chats';
import { userAPI } from '$api/user';
import { store, type ChatInfo } from '$store';
import type {
  AddUserToCharParams,
  CreateChatParams,
  DeleteUserFromChatParams,
  GetChatsParams,
  SearchCurrentChatUsersParams,
} from './types';

function adaptChatsListItems(rawList: ChatInfoFromAPI[]): ChatInfo[] {
  const { user } = store.getState();

  return rawList.map((rawParams) => ({
    id: rawParams.id,
    chatName: rawParams.title,
    lastMessage: rawParams.last_message?.content,
    lastMessageTime: rawParams.last_message?.time,
    newMessagesCount: rawParams.unread_count,
    isLastMessageOwn: rawParams.last_message?.user.login === user?.login,
    image: rawParams.avatar,
    creatorId: rawParams.created_by,
  }));
}

function deleteChatFromStore(chatId: number) {
  const { chats } = store.getState();

  if (!chats?.length) {
    return;
  }

  const newChats = chats.filter(({ id }) => id !== chatId);

  store.setByKey('chats', newChats);
}

export const chatsController = {
  async createChat(params: CreateChatParams): Promise<void> {
    await chatsAPI.createChat(params);
    await this.getChats({
      offset: 0,
      limit: 10,
    });
  },
  async getChats(params: GetChatsParams) {
    const newChats = await chatsAPI.getChats(params);
    store.setByKey('chats', adaptChatsListItems(newChats));
  },
  async addUserToChat(params: AddUserToCharParams): Promise<string> {
    const { chatId, username } = params;
    const resultsList = await userAPI.searchForUserByLogin(username);

    if (!resultsList.length) {
      return 'No such user';
    }

    const user = resultsList[0];

    await chatsAPI.addUsersToChat({
      chatId,
      users: [user.id],
    });

    return '';
  },
  async searchCurrentChatUsers(params?: SearchCurrentChatUsersParams) {
    const { currentChatId, user } = store.getState();
    const currentUserId = user?.id;

    if (!currentChatId) {
      return;
    }

    const searchResult = await chatsAPI.searchChatUsers({
      chatId: currentChatId,
      ...params,
    });

    return searchResult.filter(({ id }) => id !== currentUserId);
  },
  async deleteUserFromChat(params: DeleteUserFromChatParams) {
    const { currentChatId } = store.getState();
    const { userId } = params;

    if (!currentChatId) {
      return;
    }

    await chatsAPI.deleteUsersFromChat({
      chatId: currentChatId,
      users: [userId],
    });
  },
  async leaveCurrentChat() {
    const { user, currentChatId } = store.getState();

    if (!user?.id || !currentChatId) {
      return;
    }

    await this.deleteUserFromChat({
      userId: user.id,
    });
    deleteChatFromStore(currentChatId);
    store.setByKey('currentChatId', undefined);
  },
  async deleteCurrentChat() {
    const { currentChatId } = store.getState();

    if (!currentChatId) {
      return;
    }

    const response = await chatsAPI.deleteChat({ chatId: currentChatId });
    const { id } = response.result;
    deleteChatFromStore(id);
    store.setByKey('currentChatId', undefined);
  },
};
