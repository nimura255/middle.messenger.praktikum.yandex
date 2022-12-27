export type Listener<T extends unknown[] = unknown[]> = (
  ...args: T
) => void;

export class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, unknown[]>
> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {};
  private queuesRecord: Record<string, Array<() => void>> = {};

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
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = listeners.filter(
      (listener) => listener !== callback
    );
  }

  emit<EventKey extends E = E>(event: EventKey, ...args: M[EventKey]) {
    const handler = () => {
      const listeners = this.listeners[event];

      if (!listeners) {
        return;
      }

      listeners.forEach((listener) => {
        listener(...args);
      });

      const nextHandler = this.queuesRecord[event].shift();

      if (nextHandler) {
        nextHandler();
      }
    };

    if (!this.queuesRecord[event]) {
      this.queuesRecord[event] = [];
    }

    this.queuesRecord[event].push(handler);

    if (this.queuesRecord[event].length === 1) {
      handler();
    }
  }
}
