import { authController } from '$controllers/auth';
import { store } from '$store';

export const appController = {
  setLoadingSpinnerStatus(status: boolean) {
    store.setByKey('showLoadingSpinner', status);
  },
  async loadInitData() {
    this.setLoadingSpinnerStatus(true);
    await authController.getUserData();
    this.setLoadingSpinnerStatus(false);
  },
};
