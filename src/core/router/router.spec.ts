import { Block } from '$core/Block';
import { waitFor } from '$utils/tests';
import { Link } from './Link';
import { navigate } from './navigate';
import { Router } from './Router';

class FirstPage extends Block {
  constructor() {
    super({}, {});
  }

  render(): string {
    return '<div>First page</div>';
  }
}

class SecondPage extends Block {
  constructor() {
    super({}, {});
  }

  render(): string {
    return '<div>Second page</div>';
  }
}

function setupSpies() {
  const pushStateSpy = jest.spyOn(window.history, 'pushState');
  const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');

  return {
    pushStateSpy,
    dispatchEventSpy,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  navigate('/');
});

describe('core/router/navigate', () => {
  it('Pushes new state to history and dispatches popstate event', () => {
    const { pushStateSpy, dispatchEventSpy } = setupSpies();

    const newRoute = '/test';
    const expectedUrl = `http://localhost${newRoute}`;

    navigate(newRoute);

    expect(pushStateSpy).toBeCalled();
    expect(pushStateSpy.mock.calls[0][2]).toBe(expectedUrl);
    expect(dispatchEventSpy).toBeCalled();

    jest.restoreAllMocks();
  });
});

describe('core/router/Link', () => {
  it('Navigates to route after click', () => {
    const { pushStateSpy } = setupSpies();
    const route = '/new-route';
    const expectedNewUrl = `http://localhost${route}`;
    const block = new Link({ path: route, slot: 'hello' });

    block.element?.click();

    expect(pushStateSpy.mock.calls[0][2]).toBe(expectedNewUrl);

    jest.restoreAllMocks();
  });
});

describe('core/router/Router', () => {
  it('Renders corresponding page', () => {
    const expectedHTML = '<div><div>First page</div></div>';
    const router = new Router({
      routes: [
        {
          path: '/',
          block: FirstPage,
        },
        {
          path: '/secondPage',
          block: SecondPage,
        },
      ],
    });
    router.dispatchComponentDidMount();

    expect(router.element?.outerHTML).toBe(expectedHTML);

    router.dispatchComponentWillUnmount();
  });

  it('Changes page after route change', () => {
    const expectedHTML = '<div><div>Second page</div></div>';
    const router = new Router({
      routes: [
        {
          path: '/',
          block: FirstPage,
        },
        {
          path: '/secondPage',
          block: SecondPage,
        },
      ],
    });
    router.dispatchComponentDidMount();

    navigate('/secondPage');

    expect(router.element?.outerHTML).toBe(expectedHTML);
    router.dispatchComponentWillUnmount();
  });

  it('Redirects to current page if no corresponding page for new route is present', async () => {
    const router = new Router({
      routes: [
        {
          path: '/',
          block: FirstPage,
        },
        {
          path: '/secondPage',
          block: SecondPage,
        },
      ],
    });
    router.dispatchComponentDidMount();

    navigate('/unknownPage');

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
    router.dispatchComponentWillUnmount();
  });

  it('Allows to define routes with masks', () => {
    const router = new Router({
      routes: [
        {
          path: '/',
          block: FirstPage,
        },
        {
          path: '/*',
          block: SecondPage,
        },
      ],
    });
    router.dispatchComponentDidMount();
    const expectedHTML = '<div><div>Second page</div></div>';

    navigate('/unknownPage');

    expect(router.element?.outerHTML).toBe(expectedHTML);
    router.dispatchComponentWillUnmount();
  });

  it('Allows to subscribe to route changes', () => {
    const listener = jest.fn();
    const router = new Router({
      routes: [
        {
          path: '/',
          block: FirstPage,
        },
        {
          path: '/secondPage',
          block: SecondPage,
        },
      ],
      onRouteChange: listener,
    });
    router.dispatchComponentDidMount();

    navigate('/secondPage');

    expect(listener).toBeCalledTimes(2);
    router.dispatchComponentWillUnmount();
  });
});
