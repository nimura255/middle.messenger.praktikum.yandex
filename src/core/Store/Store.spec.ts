import { Store } from './Store';

describe('core/Store', () => {
  it("Allows to get store's state", () => {
    const store = new Store({ one: '1' });

    expect(store.getState()).toEqual({ one: '1' });
  });

  it('Allows to set new state', () => {
    const store = new Store({});

    store.set({ one: '1' });

    expect(store.getState()).toEqual({ one: '1' });
  });

  it('Allows to set value to state by key', () => {
    const store = new Store({ one: '' });

    store.setByKey('one', '1');

    expect(store.getState()).toEqual({ one: '1' });
  });

  it('Allows to reset state', () => {
    const store = new Store({ one: '' });

    store.setByKey('one', '1');
    store.reset();

    expect(store.getState()).toEqual({ one: '' });
  });

  it('Allows to subscribe to state changes', () => {
    const store = new Store({ one: '' });
    const listener = jest.fn();

    store.subscribe(listener);
    store.setByKey('one', '1');

    expect(listener).toBeCalledTimes(1);
  });

  it('Allows to subscribe to state changes with immediate call of listener', () => {
    const store = new Store({ one: '' });
    const listener = jest.fn();

    store.subscribeWithImmediateCall(listener);
    store.setByKey('one', '1');

    expect(listener).toBeCalledTimes(2);
  });

  it('Allows to unsubscribe from changes', () => {
    const store = new Store({ one: '' });
    const listener = jest.fn();

    store.subscribe(listener);
    store.unsubscribe(listener);
    store.setByKey('one', '1');

    expect(listener).toBeCalledTimes(0);
  });
});
