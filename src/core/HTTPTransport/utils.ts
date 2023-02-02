import { isObject } from '$utils/objects';
import type { Response } from './types';

export function queryStringify(data: Record<string, string>) {
  const entries = Object.entries(data).reverse();
  const stack = [...entries];
  const resultItems: string[] = [];

  while (stack.length) {
    const entry = stack.pop();

    if (!entry) {
      break;
    }

    const [key, value] = entry;

    if (Array.isArray(value)) {
      resultItems.push(`${key}=[${value.join(',')}]`);

      continue;
    }

    resultItems.push(`${key}=${value}`);
  }

  return '?' + resultItems.join('&');
}

export function isResponse<Data>(value: unknown): value is Response<Data> {
  const { code, data, dataText } = (value || {}) as IndexedObject<unknown>;

  return (
    isObject(value) &&
    typeof code === 'number' &&
    isObject(data) &&
    typeof dataText === 'string'
  );
}

export function isResponseError(
  value: unknown
): value is Response<{ reason: string }> {
  return isResponse<{ reason: string }>(value) && !!value.data.reason;
}

export function parseResponse(responseString: string) {
  try {
    return JSON.parse(responseString);
  } catch {
    return responseString;
  }
}
