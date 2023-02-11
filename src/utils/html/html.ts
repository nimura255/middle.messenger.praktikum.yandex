import type { ClassNameParam, ClassNameParamRecord } from './types';

function processClassNameRecord(record: ClassNameParamRecord) {
  const classList: string[] = [];

  for (const key in record) {
    if (record[key]) {
      classList.push(key);
    }
  }

  return classList;
}

function processClassNameParams(params: ClassNameParam[]) {
  const classList: string[] = [];

  params.forEach((argument) => {
    if (typeof argument === 'string' && argument) {
      classList.push(argument);
      return;
    }

    if (typeof argument === 'number' && argument) {
      classList.push(String(argument));
      return;
    }

    if (Array.isArray(argument)) {
      classList.push(...processClassNameParams(argument));
      return;
    }

    if (typeof argument === 'object' && argument) {
      classList.push(...processClassNameRecord(argument));
    }
  });

  return classList;
}

export function createClassList(...args: ClassNameParam[]): string {
  const classList: string[] = processClassNameParams(args);

  return classList.join(' ');
}
