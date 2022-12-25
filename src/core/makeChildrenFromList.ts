import { type Block } from './Block';

export function makeChildrenFromList(list: Block[]) {
  const keys = list.map((_, index) => index);
  const children = list.reduce((acc, child, index) => {
    return {
      ...acc,
      [String(index)]: child,
    };
  }, {});
  const template = keys.map((key) => `{{{${key}}}}`).join(' ');

  return { template, children };
}
