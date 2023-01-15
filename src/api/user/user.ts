import { HTTPTransport } from '$core/HTTPTransport';
import { transformAvatarLinkInUserInfo } from '../utils';
import type {
  ChangeUserProfileParams,
  ChangePasswordParams,
} from './types';
import type { UserInfo } from '../types';

export const userApi = {
  httpTransport: new HTTPTransport('api/v2/user'),

  async changeAvatar(formData: FormData): Promise<UserInfo> {
    const response = await this.httpTransport.put<UserInfo>(
      'profile/avatar',
      {
        data: formData,
      }
    );

    return transformAvatarLinkInUserInfo(response.data);
  },
  async changePassword(params: ChangePasswordParams): Promise<void> {
    await this.httpTransport.put<void>('password', { data: params });
  },
  async changeUserProfile(
    params: ChangeUserProfileParams
  ): Promise<UserInfo> {
    const response = await this.httpTransport.put<UserInfo>('profile', {
      data: params,
    });

    return transformAvatarLinkInUserInfo(response.data);
  },
  async getUserById(id: number): Promise<UserInfo> {
    const response = await this.httpTransport.get<UserInfo>(`${id}`);

    return transformAvatarLinkInUserInfo(response.data);
  },
  async searchForUserByLogin(login: string): Promise<UserInfo[]> {
    const response = await this.httpTransport.post<UserInfo[]>('search', {
      data: { login },
    });

    return response.data.map(transformAvatarLinkInUserInfo);
  },
};
