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

export function handleAuthError(error: unknown) {
  if (isResponseError(error)) {
    const { code, data } = error;

    if (code === 401) {
      return (data as Record<string, string>).reason;
    }
  }

  return '';
}
