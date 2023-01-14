import { EventBus } from '$core/EventBus';
import { deepCopy, set } from '$utils/objects';

enum StoreEvents {
  Updated = 'updated',
}

export class Store<State extends IndexedObject> {
  private state: State;
  private readonly initState: State;
  private readonly eventBus = new EventBus<
    StoreEvents,
    { [key in StoreEvents]: [State] }
  >();

  constructor(initState: State) {
    this.state = deepCopy(initState);
    this.initState = deepCopy(initState);
  }

  set = (newState: State) => {
    this.state = deepCopy(newState);
    this.eventBus.emit(StoreEvents.Updated, newState);
  };

  setByKey = <Key extends keyof State>(key: Key, value: State[Key]) => {
    this.state = set(this.state, key as string, value);
    this.eventBus.emit(StoreEvents.Updated, this.state);
  };

  reset = () => {
    this.state = deepCopy(this.initState);
    this.eventBus.emit(StoreEvents.Updated, this.state);
  };

  subscribe = (callback: (state: State) => void) => {
    this.eventBus.on(StoreEvents.Updated, callback);
  };

  getState = () => {
    return this.state;
  };
}
