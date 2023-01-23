import { urlJoin } from '$utils/url';
import type { UserInfo } from './types';

export function transformAvatar(src: string) {
  return urlJoin(process.env.API_ROOT as string, 'api/v2/resources', src);
}

export function transformAvatarLinkInUserInfo(
  userInfo: UserInfo
): UserInfo {
  const transformedAvatarLink = userInfo.avatar
    ? transformAvatar(userInfo.avatar)
    : '';

  return {
    ...userInfo,
    avatar: transformedAvatarLink,
  };
}
