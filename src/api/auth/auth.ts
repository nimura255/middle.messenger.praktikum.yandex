import { HTTPTransport } from '$core/HTTPTransport';
import { transformAvatarLinkInUserInfo } from '../utils';
import type { SignInParams, SignUpResponse, SignUpParams } from './types';
import type { UserInfo } from '../types';

export const authAPI = {
  httpTransport: new HTTPTransport('api/v2/auth'),

  async signUp(params: SignUpParams): Promise<SignUpResponse> {
    const response = await this.httpTransport.post<SignUpResponse>(
      'signup',
      {
        data: params,
      }
    );

    return response.data;
  },
  async signIn(params: SignInParams): Promise<void> {
    await this.httpTransport.post<void>('signin', {
      data: params,
    });
  },
  async getUserInfo(): Promise<UserInfo> {
    const response = await this.httpTransport.get<UserInfo>('user');

    return transformAvatarLinkInUserInfo(response.data);
  },
  async logOut(): Promise<void> {
    await this.httpTransport.post<void>('logout');
  },
};
