import { transformAvatar } from '../utils';
import type { ChatInfo, ChatUserInfo } from './types';

export function transformAvatarInChatInfo(data: ChatInfo): ChatInfo {
  return {
    ...data,
    avatar: data.avatar ? transformAvatar(data.avatar) : '',
  };
}

export function transformAvatarInChatUserInfo(
  data: ChatUserInfo
): ChatUserInfo {
  return {
    ...data,
    avatar: data.avatar ? transformAvatar(data.avatar) : '',
  };
}
