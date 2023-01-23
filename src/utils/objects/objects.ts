export function isObject(value: unknown) {
  return !!value && typeof value === 'object';
}

export function deepCopy<T>(target: T): T {
  if (!isObject(target)) {
    return target;
  }

  const result = (Array.isArray(target) ? [] : {}) as T;

  for (const key in target) {
    result[key] = deepCopy(target[key]);
  }

  return result;
}

export function merge(
  firstObject: IndexedObject,
  secondObject: IndexedObject
) {
  if (Array.isArray(firstObject) && Array.isArray(secondObject)) {
    return secondObject;
  }

  const result = (
    Array.isArray(firstObject) ? [...firstObject] : { ...firstObject }
  ) as IndexedObject;

  for (const key in secondObject) {
    if (!(isObject(secondObject[key]) && Object.hasOwn(result, key))) {
      result[key] = secondObject[key];

      continue;
    }

    result[key] = merge(
      result[key] as IndexedObject,
      secondObject[key] as IndexedObject
    );
  }

  return result;
}

export function set<ObjectType extends IndexedObject, Path extends string>(
  object: ObjectType,
  path: Path,
  value: unknown
): ObjectType & { [key in Path]: typeof value } {
  if (!isObject(object)) {
    return object;
  }

  const keys = path.split('.');
  const resultSkeleton = keys.reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value as IndexedObject
  );

  return merge(object, resultSkeleton) as ObjectType & {
    [key in Path]: typeof value;
  };
}
