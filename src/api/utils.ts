import { urlJoin } from '$utils/url';
import type { UserInfo } from './types';

export function transformAvatarLinkInUserInfo(
  userInfo: UserInfo
): UserInfo {
  return {
    ...userInfo,
    avatar: urlJoin(
      process.env.API_ROOT as string,
      'api/v2/resources',
      userInfo.avatar
    ),
  };
}
