import { LoadingOverlay } from '$components/LoadingOverlay';
import { Block } from '$core/Block';
import { store, type StoreState } from '$store';

export class ConnectedLoadingOverlay extends Block {
  constructor() {
    const loadingIndicator = new LoadingOverlay();

    super(
      {
        isVisible: true,
        children: { slot: loadingIndicator },
      },
      {}
    );
  }

  connectToStore = (storeState: Partial<StoreState>) => {
    const { showLoadingSpinner } = storeState;

    if (showLoadingSpinner !== this.props.isVisible) {
      this.setProp('isVisible', showLoadingSpinner);
    }
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
  }

  render() {
    return `
      <div>
        {{#if isVisible}}
          {{{slot}}}
        {{/if}}
      </div>
    `;
  }
}
