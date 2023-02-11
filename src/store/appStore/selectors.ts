import type { StoreState } from './types';

export function selectCurrentChat(storeState: Partial<StoreState>) {
  const { currentChatId, chats } = storeState;

  return chats?.find(({ id }) => id === currentChatId);
}

export function selectChat(
  chatId: number,
  storeState: Partial<StoreState>
) {
  const { chats } = storeState;

  return chats?.find((chat) => chat.id === chatId);
}
