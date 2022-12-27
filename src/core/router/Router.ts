import { Block } from '$core/Block';
import type { RouterProps } from './types';

export class Router extends Block {
  routesMap: Map<string, () => Block>;

  constructor(props: RouterProps) {
    const { routes } = props;
    const initPath = window.location.pathname || '';

    const routesMap = new Map(
      routes.map((routeParams) => {
        return [routeParams.path, routeParams.blockCreator];
      })
    );

    const createInitBlock = routesMap.get(initPath);
    let children = {};

    if (createInitBlock) {
      children = { page: createInitBlock() };
    }

    super({ children, routes }, {});

    this.prepareRouter();
    this.routesMap = routesMap;
  }

  private prepareRouter = () => {
    addEventListener('popstate', () => {
      const newPath = window.location.pathname;

      const createPage = this.routesMap.get(newPath);

      if (createPage) {
        const block = createPage();

        this.setProps((props) => ({
          ...props,
          children: { page: block },
        }));
      }
    });
  };

  render(): string {
    return '<div>{{{page}}}</div>';
  }
}
