import type { Block, BaseProps } from '$core/Block';

export type LinkProps = BaseProps & {
  path: string;
  className?: string;
  slot?: string;
};

export type RouterProps = BaseProps & {
  routes: RouteParams[];
  onRouteChange?: () => void;
};

type RouteParams = {
  path: string;
  block: typeof Block<Record<string, unknown>>;
};

export type RouterRoutesListItem = {
  pathRegExp: RegExp;
  block: typeof Block<Record<string, unknown>>;
};
