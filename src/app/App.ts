import { appController } from '$controllers/app';
import { Block } from '$core/Block';
import { Router } from '$core/router';
import { ConnectedLoadingOverlay } from './ConnectedLoadingOverlay';
import { handleRoutesRestrictions } from './utils';
import { routerRoutesList } from './constants';
import { store } from '$store';

export class App extends Block {
  router = new Router({
    routes: routerRoutesList,
    onRouteChange: handleRoutesRestrictions,
  });

  constructor() {
    const loadingIndicator = new ConnectedLoadingOverlay();

    super({ children: { loadingIndicator } }, {});
  }

  async componentDidMount() {
    await appController.loadInitData();
    this.setProp('children', { ...this.children, router: this.router });

    store.subscribe(handleRoutesRestrictions);
  }

  componentWillUnmount() {
    store.unsubscribe(handleRoutesRestrictions);
  }

  render(): string {
    return `
      <div>
        {{{router}}}
        {{{loadingIndicator}}}
      </div>
    `;
  }
}
