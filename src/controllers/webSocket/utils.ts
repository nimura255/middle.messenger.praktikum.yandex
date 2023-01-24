import type { Message } from '$store';
import type { SocketChatMessage } from './types';

export function adaptMessageForStore(
  rawMessage: SocketChatMessage,
  authorName?: string
): Message {
  const { id, time, user_id, content } = rawMessage;

  return {
    id,
    time,
    text: content,
    user_id,
    authorName,
  };
}
