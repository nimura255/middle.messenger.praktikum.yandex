export type Listener<T extends unknown[] = unknown[]> = (
  ...args: T
) => void;

export class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, unknown[]>
> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};

  on<EventKey extends E = E>(
    event: EventKey,
    callback: Listener<M[EventKey]>
  ) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    (this.listeners[event] as Listener<M[EventKey]>[]).push(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    const listeners = this.listeners[event];

    if (!listeners?.length) {
      throw new Error(`No listeners for event ${event}`);
    }

    this.listeners[event] = listeners.filter(
      (listener) => listener !== callback
    );
  }

  emit<EventKey extends E = E>(event: EventKey, ...args: M[EventKey]) {
    const listeners = this.listeners[event];

    if (!listeners?.length) {
      return;
    }

    listeners.forEach((listener) => {
      listener(...args);
    });
  }
}
