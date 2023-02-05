import { store, type ChatInfo } from '$store';
import type { ChatInfo as ChatInfoFromAPI } from '$api/chats';

export function adaptChatsListItems(
  rawList: ChatInfoFromAPI[]
): ChatInfo[] {
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

export function deleteChatFromStore(chatId: number) {
  const { chats } = store.getState();

  if (!chats?.length) {
    return;
  }

  const newChats = chats.filter(({ id }) => id !== chatId);

  store.setByKey('chats', newChats);
}
