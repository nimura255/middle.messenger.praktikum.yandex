import { type BaseProps, Block } from '$core/Block';
// import type { RouterProps } from './types';

type RouterProps = BaseProps & {
  routes: RouteParams[];
};

type RouteParams = {
  path: string;
  block: typeof Block<Record<string, unknown>>;
};

type RouterRoutesListItem = {
  pathRegExp: RegExp;
  block: typeof Block<Record<string, unknown>>;
};

function makeRegExpFromPath(path: string) {
  const tokens = path.split('/');
  const pathRegExpTemplate = tokens.join('/').replace('*', '.*');

  return new RegExp(`^${pathRegExpTemplate}$`);
}

export class Router extends Block {
  routes: Array<RouterRoutesListItem>;

  constructor(props: RouterProps) {
    const { routes } = props;
    const initPath = window.location.pathname || '/';

    super({ children: {}, routes }, {});

    this.prepareRouter();
    this.routes = routes.map(({ path, block }) => ({
      pathRegExp: makeRegExpFromPath(path),
      block,
    }));
    this.handleRouteChange(initPath);
  }

  private prepareRouter = () => {
    addEventListener('popstate', () => {
      this.handleRouteChange(window.location.pathname);
    });
  };

  private handleRouteChange(newPath: string) {
    const pageConstructor = this.findRoute(newPath);

    if (pageConstructor) {
      const block = new pageConstructor({}, {});
      this.setProp('children', { page: block });
    }
  }

  private findRoute(path: string) {
    const matchingRoute = this.routes.find((route) => {
      return route.pathRegExp.test(path);
    });

    return matchingRoute?.block;
  }

  render(): string {
    return '{{{page}}}';
  }
}
