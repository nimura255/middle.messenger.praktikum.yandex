import { LoadingOverlay } from '$components/LoadingOverlay';
import { routes } from '$constants/routes';
import { appController } from '$controllers/app';
import { Block } from '$core/Block';
import { renderDOM } from '$core/renderDOM';
import { navigate, Router } from '$core/router';
import { ChatPage } from '$pages/ChatPage';
import { Fallback404Page } from '$pages/Fallback404Page';
import { ProfilePage } from '$pages/ProfilePage';
import { ProfileEditPage } from '$pages/ProfileEditPage';
import { ProfilePasswordChangePage } from '$pages/ProfilePasswordChangePage';
import { SignUpPage } from '$pages/SignUpPage';
import { SignInPage } from '$pages/SignInPage';
import { store, type StoreState } from '$store';
import './styles/styles.pcss';

const authOnlyRoutes = [
  routes.messenger,
  routes.settings,
  routes.changePassword,
  routes.changeInfo,
];
const nonAuthOnlyRoutes = [routes.signIn, routes.signUp];

const router = new Router({
  routes: [
    {
      path: routes.messenger,
      block: ChatPage,
    },
    {
      path: routes.signIn,
      block: SignInPage,
    },
    {
      path: routes.signUp,
      block: SignUpPage,
    },
    {
      path: routes.settings,
      block: ProfilePage,
    },
    {
      path: routes.changeInfo,
      block: ProfileEditPage,
    },
    {
      path: routes.changePassword,
      block: ProfilePasswordChangePage,
    },
    {
      path: '/*',
      block: Fallback404Page,
    },
  ],
});

class App extends Block {
  constructor() {
    const loadingIndicator = new LoadingOverlay();

    super(
      {
        children: { loadingIndicator },
        showLoadingSpinner: true,
      },
      {}
    );
  }

  handleRoutesRestrictions = (storeState: Partial<StoreState>) => {
    const { user } = storeState;

    const currentPathname = window.location.pathname;
    const isAuthOnlyPathname = authOnlyRoutes.includes(currentPathname);
    const isNonAuthOnlyPathname =
      nonAuthOnlyRoutes.includes(currentPathname);

    if (!user && isAuthOnlyPathname) {
      navigate(nonAuthOnlyRoutes[0]);
    } else if (user && isNonAuthOnlyPathname) {
      navigate(authOnlyRoutes[0]);
    }
  };

  connectLoaderStateToStore = (storeState: Partial<StoreState>) => {
    const { showLoadingSpinner } = storeState;

    if (
      typeof showLoadingSpinner === 'boolean' &&
      showLoadingSpinner !== this.props.showLoadingSpinner
    ) {
      this.setProp('showLoadingSpinner', showLoadingSpinner);
    }
  };

  async componentDidMount() {
    store.subscribeWithImmediateCall(this.connectLoaderStateToStore);

    await appController.loadInitData();
    this.setProp('children', { ...this.children, router });

    store.subscribeWithImmediateCall(this.handleRoutesRestrictions);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectLoaderStateToStore);
    store.unsubscribe(this.handleRoutesRestrictions);
  }

  render(): string {
    return `
      {{{router}}}
      <div>
        {{#if showLoadingSpinner}}
          {{{loadingIndicator}}}
        {{/if}}
      </div>
    `;
  }
}

renderDOM('#app', new App());
