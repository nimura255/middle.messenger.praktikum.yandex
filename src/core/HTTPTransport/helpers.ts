import { isObject } from '$utils/objects';
import type { ResponseError } from './types';

export function isResponseError(data: unknown): data is ResponseError {
  const { code, response, responseText } = (data || {}) as IndexedObject;

  return (
    isObject(data) &&
    typeof code === 'number' &&
    isObject(response) &&
    typeof responseText === 'string'
  );
}
