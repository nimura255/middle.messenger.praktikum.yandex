import { Block } from '$core/Block';
import type { RouterProps, RouterRoutesListItem } from './types';
import { navigate } from './navigate';

function makeRegExpFromPath(path: string) {
  const tokens = path.split('/');
  const pathRegExpTemplate = tokens.join('/').replace('*', '.*');

  return new RegExp(`^${pathRegExpTemplate}$`);
}

export class Router extends Block {
  routes: Array<RouterRoutesListItem>;
  currentPath: string | undefined;

  constructor(props: RouterProps) {
    const { routes } = props;
    const initPath = window.location.pathname || '/';

    super({ children: {}, routes }, {});

    this.prepareRouter();
    this.routes = routes.map(({ path, block, constraint }) => ({
      pathRegExp: makeRegExpFromPath(path),
      constraint,
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
    const route = this.findRoute(newPath);

    if (!route || (route.constraint && !route.constraint())) {
      navigate(this.currentPath || '/');
      return;
    }

    const { block: pageConstructor } = route;
    const block = new pageConstructor({}, {});
    this.setProp('children', { page: block });
    this.currentPath = newPath;
  }

  private findRoute(path: string) {
    return this.routes.find((route) => {
      return route.pathRegExp.test(path);
    });
  }

  render(): string {
    return '{{{page}}}';
  }
}
