import { type Block } from './Block';

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
