import { chatsAPI, type ChatUserInfo } from '$api/chats';
import { userAPI } from '$api/user';
import { selectChat, store } from '$store/appStore';
import { chatStore } from '$store/chatStore';
import { adaptChatsListItems, deleteChatFromStore } from './utils';
import type {
  AddUserToCharParams,
  CreateChatParams,
  DeleteUserFromChatParams,
  GetChatsParams,
  SelectChatParams,
  UpdateChatLastMessageParams,
  UpdateChatNewMessagesCountParams,
} from './types';

export const chatsController = {
  async createChat(params: CreateChatParams): Promise<void> {
    const { id } = await chatsAPI.createChat(params);

    const storeState = store.getState();
    const { user, chats: currentChatsList } = storeState;
    const creatorId = user?.id;

    if (typeof creatorId === 'number') {
      const newChat = { id, chatName: params.title, creatorId };
      const newChatsList = currentChatsList
        ? [newChat, ...currentChatsList]
        : [newChat];

      store.setByKey('chats', newChatsList);
    }
  },
  async getChats(params: GetChatsParams) {
    const newChats = await chatsAPI.getChats(params);
    const adaptedNewChats = adaptChatsListItems(newChats);

    const currentChatsList = store.getState().chats;
    const newChatsList = currentChatsList
      ? [...currentChatsList, ...adaptChatsListItems(newChats)]
      : adaptedNewChats;

    store.setByKey('chats', newChatsList);

    const { limit } = params;
    const isEndOfList = !newChats.length || (limit || 0) > newChats.length;

    return { isEndOfList };
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

    const chatUsers = await this.getAllUsersOfChat({
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
    chatStore.set({
      hasLoadedAllOldMessages: false,
      users: filteredChatUsers,
      messages: [],
    });
  },
  async getAllUsersOfChat(params: { chatId: number }) {
    let hasReachedEnd = false;
    const limit = 20;
    const users: ChatUserInfo[] = [];

    while (!hasReachedEnd) {
      const portion = await chatsAPI.searchChatUsers({
        chatId: params.chatId,
        offset: users.length,
        limit,
      });

      users.push(...portion);

      if (portion.length < limit) {
        hasReachedEnd = true;
      }
    }

    return users;
  },
  updateChatLastMessage(params: UpdateChatLastMessageParams) {
    const storeState = store.getState();
    const { chats, user } = storeState;
    const requiredChat = selectChat(params.chatId, storeState);

    if (!chats || !requiredChat) {
      return;
    }

    requiredChat.lastMessage = params.lastMessage;
    requiredChat.lastMessageTime = params.lastMessageTime;
    requiredChat.isLastMessageOwn = params.lastMessageUserId === user?.id;

    store.setByKey('chats', [...chats]);
  },
  updateChatNewMessagesCount(params: UpdateChatNewMessagesCountParams) {
    const storeState = store.getState();
    const { chats } = storeState;
    const requiredChat = selectChat(params.chatId, storeState);

    if (!chats || !requiredChat) {
      return;
    }

    requiredChat.newMessagesCount = params.count;
    store.setByKey('chats', [...chats]);
  },
  updateCurrentChatLastMessage(
    params: Omit<UpdateChatLastMessageParams, 'chatId'>
  ) {
    const { currentChatId } = store.getState();

    if (typeof currentChatId === 'number') {
      this.updateChatLastMessage({
        ...params,
        chatId: currentChatId,
      });
    }
  },
  updateCurrentChatNewMessagesCount(
    params: Omit<UpdateChatNewMessagesCountParams, 'chatId'>
  ) {
    const { count } = params;
    const { currentChatId } = store.getState();

    if (typeof currentChatId === 'number') {
      this.updateChatNewMessagesCount({
        chatId: currentChatId,
        count,
      });
    }
  },
};
