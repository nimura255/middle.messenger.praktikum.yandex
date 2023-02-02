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
    const { routes, onRouteChange } = props;

    super({ routes, onRouteChange, children: {} }, {});

    this.routes = routes.map(({ path, block }) => ({
      pathRegExp: makeRegExpFromPath(path),
      block,
    }));
  }

  private popstateListener = () => {
    this.handleRouteChange(window.location.pathname);
  };

  private prepareRouter = () => {
    addEventListener('popstate', this.popstateListener);
  };

  private handleRouteChange(newPath: string) {
    const route = this.findRoute(newPath);

    if (!route) {
      navigate(this.currentPath || '/');
      return;
    }

    const { block: pageConstructor } = route;
    const block = new pageConstructor({}, {});
    this.setProp('children', { page: block });
    this.currentPath = newPath;

    const onRouteChange = this.props.onRouteChange as
      | (() => void)
      | undefined;

    if (onRouteChange) {
      onRouteChange();
    }
  }

  private findRoute(path: string) {
    return this.routes.find((route) => {
      return route.pathRegExp.test(path);
    });
  }

  componentDidMount() {
    const initPath = window.location.pathname || '/';

    this.prepareRouter();
    this.handleRouteChange(initPath);
  }

  componentWillUnmount() {
    removeEventListener('popstate', this.popstateListener);
  }

  render(): string {
    return '<div>{{{page}}}</div>';
  }
}
