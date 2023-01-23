export function mergeListIntoAnother<T>(source: T[], newValues: T[]): T[] {
  const maxIndex = Math.max(source.length, newValues.length);
  const result: T[] = [];

  for (let index = 0; index < maxIndex; index++) {
    const sourceValue = source[index];
    const newValue = newValues[index];

    result.push(newValue || sourceValue);
  }

  return result;
}
