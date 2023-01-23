import type { StoreState } from './types';

export function selectCurrentChat(storeState: Partial<StoreState>) {
  const { currentChatId, chats } = storeState;

  return chats?.find(({ id }) => id === currentChatId);
}
