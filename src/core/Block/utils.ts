import type { Block, BlockRef } from './Block';

export function createRef(): BlockRef {
  return { current: null } as BlockRef;
}

export function makeChildrenFromList(list: Block[], prefix = '') {
  const keys = list.map((_, index) => index);
  const children = list.reduce((acc, child, index) => {
    return {
      ...acc,
      [`${prefix}${index}`]: child,
    };
  }, {});
  const template = keys.map((key) => `{{{${prefix}${key}}}}`).join(' ');

  return { template, children };
}
