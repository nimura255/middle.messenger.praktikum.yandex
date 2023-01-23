import { chatsAPI } from '$api/chats';
import { userAPI } from '$api/user';
import { chatStore, store } from '$store';
import { adaptChatsListItems, deleteChatFromStore } from './utils';
import type {
  AddUserToCharParams,
  CreateChatParams,
  DeleteUserFromChatParams,
  GetChatsParams,
  SearchCurrentChatUsersParams,
  SelectChatParams,
} from './types';

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
    const { users } = chatStore.getState();
    const { userId } = params;

    if (!currentChatId) {
      return;
    }

    await chatsAPI.deleteUsersFromChat({
      chatId: currentChatId,
      users: [userId],
    });

    const newUsersList = users.filter(({ id }) => id !== userId);

    chatStore.setByKey('users', newUsersList);
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
  async selectChat(params: SelectChatParams) {
    const storeState = store.getState();
    const { currentChatId, user } = storeState;

    if (currentChatId === params.chatId) {
      return;
    }

    const chatUsers = await chatsAPI.searchChatUsers({
      chatId: params.chatId,
    });
    const { token } = await chatsAPI.connectToChat(params);

    const filteredChatUsers = chatUsers.filter(
      ({ id }) => id !== user?.id
    );

    store.set({
      ...storeState,
      currentChatToken: token,
      currentChatId: params.chatId,
    });
    chatStore.setByKey('users', filteredChatUsers);
  },
};
