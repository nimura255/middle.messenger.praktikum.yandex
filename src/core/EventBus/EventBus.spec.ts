import { EventBus } from './EventBus';

describe('EventBus', () => {
  it('Allows to subscribe and emit', () => {
    const eventBus = new EventBus();
    const eventName = 'test-event-name';
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBus.on(eventName, handler1);
    eventBus.on(eventName, handler2);

    eventBus.emit(eventName);

    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(1);
  });

  it('Emits only corresponding handlers', () => {
    const eventBus = new EventBus();
    const eventName1 = 'test-event-name-1';
    const eventName2 = 'test-event-name-2';
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBus.on(eventName1, handler1);
    eventBus.on(eventName2, handler2);

    eventBus.emit(eventName1);

    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(0);
  });

  it('Allows to remove event handlers', () => {
    const eventBus = new EventBus();
    const eventName = 'test-event-name';
    const handler1 = jest.fn();
    const handler2 = jest.fn();

    eventBus.on(eventName, handler1);
    eventBus.on(eventName, handler2);

    eventBus.off(eventName, handler2);
    eventBus.emit(eventName);

    expect(handler1).toBeCalledTimes(1);
    expect(handler2).toBeCalledTimes(0);
  });

  it('Throws error after .off() call if no listeners are present', () => {
    const eventBus = new EventBus();
    const eventName = 'test-event-name';
    const handler = jest.fn();
    let errorMessage = '';

    eventBus.on(eventName, handler);
    eventBus.off(eventName, handler);

    try {
      eventBus.off(eventName, handler);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    }

    expect(errorMessage).toBe(`No listeners for event ${eventName}`);
  });

  it("Doesn't emit anything if no listeners for event are present", () => {
    const eventBus = new EventBus();
    const eventName = 'test-event-name';
    const handler = jest.fn();

    eventBus.on(eventName, handler);
    eventBus.off(eventName, handler);
    eventBus.emit(eventName);

    expect(handler).not.toBeCalled();
  });
});
