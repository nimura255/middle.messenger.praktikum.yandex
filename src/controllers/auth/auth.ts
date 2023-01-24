import { authAPI } from '$api/auth';
import { store } from '$store';
import { handleAccessError, handleAuthError } from './utils';
import type { SignInParams, SignUpParams } from './types';

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
    }
  },
  async logOut() {
    await authAPI.logOut();
    store.reset();
  },
};
