import { isResponseError } from '$core/HTTPTransport';
import { store } from '$store';

export function handleAccessError(error: unknown) {
  if (!isResponseError(error)) {
    return;
  }

  const { code } = error;

  if (code === 403) {
    store.reset();
  }
}
