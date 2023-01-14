import { LoadingOverlay } from '$components/LoadingOverlay';
import { routes } from '$constants/routes';
import { appController } from '$controllers/app';
import { Block } from '$core/Block';
import { renderDOM } from '$core/renderDOM';
import { Router } from '$core/router';
import { ChatPage } from '$pages/ChatPage';
import { Fallback404Page } from '$pages/Fallback404Page';
import { ProfilePage } from '$pages/ProfilePage';
import { ProfileEditPage } from '$pages/ProfileEditPage';
import { ProfilePasswordChangePage } from '$pages/ProfilePasswordChangePage';
import { SignUpPage } from '$pages/SignUpPage';
import { SignInPage } from '$pages/SignInPage';
import { store } from '$store';
import './styles/styles.pcss';

function routeAuthorizedConstraint() {
  const state = store.getState();

  return !!state.user;
}

function routeUnauthorizedConstraint() {
  const state = store.getState();

  return !state.user;
}

const router = new Router({
  routes: [
    {
      path: routes.messenger,
      block: ChatPage,
      constraint: routeAuthorizedConstraint,
    },
    {
      path: routes.signIn,
      block: SignInPage,
      constraint: routeUnauthorizedConstraint,
    },
    {
      path: routes.signUp,
      block: SignUpPage,
      constraint: routeUnauthorizedConstraint,
    },
    {
      path: routes.settings,
      block: ProfilePage,
      constraint: routeAuthorizedConstraint,
    },
    {
      path: routes.changeInfo,
      block: ProfileEditPage,
      constraint: routeAuthorizedConstraint,
    },
    {
      path: routes.changePassword,
      block: ProfilePasswordChangePage,
      constraint: routeAuthorizedConstraint,
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

  async componentDidMount() {
    store.subscribe(({ showLoadingSpinner }) => {
      if (showLoadingSpinner !== this.props.showLoadingSpinner) {
        this.setProp('showLoadingSpinner', showLoadingSpinner);
      }
    });

    await appController.loadInitData();
    this.setProp('children', { ...this.children, router });
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
