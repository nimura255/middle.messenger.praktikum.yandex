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
