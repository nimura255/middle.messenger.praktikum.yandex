import type { Block, BaseProps } from '$core/Block';

export type LinkProps = BaseProps & {
  path: string;
  className?: string;
  slot: string;
};

export type RouterProps = BaseProps & {
  routes: RouteParams[];
};

type RouteParams = {
  path: string;
  blockCreator: () => Block;
};
