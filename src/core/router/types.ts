import type { Block, BaseProps } from '$core/Block';

export type LinkProps = BaseProps & {
  path: string;
  className?: string;
  slot?: string;
};

export type RouterProps = BaseProps & {
  routes: RouteParams[];
};

type RouteConstraint = () => boolean;

type RouteParams = {
  path: string;
  block: typeof Block<Record<string, unknown>>;
  constraint?: RouteConstraint;
};

export type RouterRoutesListItem = {
  pathRegExp: RegExp;
  block: typeof Block<Record<string, unknown>>;
  constraint?: RouteConstraint;
};
