import { LoadingOverlay } from '$components/LoadingOverlay';
import { Block } from '$core/Block';
import { Portal } from '$core/Portal';
import { store, type StoreState } from '$store';

export class ConnectedLoadingOverlay extends Block {
  loadingOverlay: LoadingOverlay;

  constructor() {
    super({}, {});

    this.loadingOverlay = new LoadingOverlay();
  }

  connectToStore = (storeState: Partial<StoreState>) => {
    const { showLoadingSpinner } = storeState;

    if (showLoadingSpinner) {
      const portal = new Portal({
        slot: this.loadingOverlay,
      }) as unknown as Block;

      this.setProp('children', { slot: portal });
    } else {
      this.setProp('children', {});
    }
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
  }

  render() {
    return `<div>{{{slot}}}</div>`;
  }
}
