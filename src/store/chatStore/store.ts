import { Store } from '$core/Store';
import type { ChatStoreState } from './types';

export const chatStore = new Store<ChatStoreState>({
  messages: [],
  users: [],
});
