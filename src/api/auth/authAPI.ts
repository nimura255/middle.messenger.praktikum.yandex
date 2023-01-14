import { HTTPTransport } from '$core/HTTPTransport';
import type {
  GetUserInfoResponse,
  SignInParams,
  SignUpResponse,
  SignUpParams,
} from './types';

export const authAPI = {
  httpTransport: new HTTPTransport('api/v2/auth'),

  signUp(params: SignUpParams) {
    return this.httpTransport.post<SignUpResponse>('signup', {
      data: params,
    });
  },
  signIn(params: SignInParams) {
    return this.httpTransport.post<void>('signin', {
      data: params,
    });
  },
  getUserInfo() {
    return this.httpTransport.get<GetUserInfoResponse>('user');
  },
  logOut() {
    return this.httpTransport.post<void>('logout');
  },
};
