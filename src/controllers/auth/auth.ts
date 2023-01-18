import { authAPI } from '$api/auth';
import { isResponseError } from '$core/HTTPTransport';
import { store } from '$store';
import type { SignInParams, SignUpParams } from './types';

function handleAccessError(error: unknown) {
  if (!isResponseError(error)) {
    return;
  }

  const { code } = error;

  if (code === 403) {
    store.reset();
  }
}

function handleAuthError(error: unknown) {
  if (isResponseError(error)) {
    const { code, data } = error;

    if (code === 401) {
      return (data as Record<string, string>).reason;
    }
  }

  return '';
}

export const authController = {
  async signIn(params: SignInParams) {
    let errorText = '';

    try {
      await authAPI.signIn(params);
      await this.getUserData();
    } catch (error) {
      errorText = handleAuthError(error);
    }

    return errorText;
  },
  async signUp(params: SignUpParams) {
    let errorText = '';

    try {
      await authAPI.signUp(params);
      await this.getUserData();
    } catch (error) {
      errorText = handleAuthError(error);
    }

    return errorText;
  },
  async getUserData() {
    try {
      const response = await authAPI.getUserInfo();
      const {
        id,
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
      } = response;

      store.setByKey('user', {
        id,
        firstName: first_name,
        secondName: second_name,
        displayName: display_name,
        login,
        email,
        phone,
        avatar,
      });
    } catch (error) {
      handleAccessError(error);
      throw error;
    }
  },
  async logOut() {
    await authAPI.logOut();
    store.reset();
  },
};
