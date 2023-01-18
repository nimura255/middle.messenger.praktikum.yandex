import { userApi } from '$api/user';
import { routes } from '$constants/routes';
import { appController } from '$controllers/app';
import { isResponseError } from '$core/HTTPTransport';
import { navigate } from '$core/router';
import { store } from '$store';
import { handleAccessError } from '../utils';
import type {
  ChangeUserPasswordParams,
  ChangeUserInfoParams,
} from './types';

function handleDataSubmitError(error: unknown) {
  if (isResponseError(error)) {
    const { code, data } = error;

    if (code === 400) {
      return data.reason || '';
    }
  }

  return '';
}

export const userController = {
  async changePassword(params: ChangeUserPasswordParams) {
    let errorText = '';

    appController.setLoadingSpinnerStatus(true);

    try {
      await userApi.changePassword(params);
      navigate(routes.settings);
    } catch (error) {
      handleAccessError(error);
      errorText = handleDataSubmitError(error);
    } finally {
      appController.setLoadingSpinnerStatus(false);
    }

    return errorText;
  },
  async changeUserProfile(params: ChangeUserInfoParams) {
    let errorText = '';

    appController.setLoadingSpinnerStatus(true);

    try {
      const newUserInfo = await userApi.changeUserProfile({
        first_name: params.firstName,
        second_name: params.secondName,
        display_name: params.displayName,
        login: params.login,
        email: params.email,
        phone: params.phone,
      });

      store.setByKey('user', {
        id: newUserInfo.id,
        firstName: newUserInfo.first_name,
        secondName: newUserInfo.second_name,
        displayName: newUserInfo.display_name,
        login: newUserInfo.login,
        email: newUserInfo.email,
        phone: newUserInfo.phone,
        avatar: newUserInfo.avatar,
      });
      navigate(routes.settings);
    } catch (error) {
      handleAccessError(error);
      errorText = handleDataSubmitError(error);
    } finally {
      appController.setLoadingSpinnerStatus(false);
    }

    return errorText;
  },
  async changeAvatar(avatarFile: File) {
    appController.setLoadingSpinnerStatus(true);

    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await userApi.changeAvatar(formData);

      store.setByKey('user', {
        id: response.id,
        firstName: response.first_name,
        secondName: response.second_name,
        displayName: response.display_name,
        login: response.login,
        email: response.email,
        phone: response.phone,
        avatar: response.avatar,
      });
    } catch (error) {
      handleAccessError(error);
    } finally {
      appController.setLoadingSpinnerStatus(false);
    }
  },
};
