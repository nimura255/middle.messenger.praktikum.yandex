import { Block } from '$core/Block';
import { AvatarUploader as AvatarUploaderView } from '$components/AvatarUploader';
import { userController } from '$controllers/user';
import { store, type StoreState } from '$store';

export class AvatarUploader extends Block {
  uploaderView: AvatarUploaderView;

  constructor() {
    const handleFileUpload = async (event: InputEvent) => {
      const element = event.target as HTMLInputElement;

      if (!element.files) {
        return;
      }

      const file = element.files[0];

      if (file) {
        await userController.changeAvatar(file);
      }
    };

    const uploaderView = new AvatarUploaderView({
      name: 'avatar',
      src: '',
      events: {
        change: handleFileUpload,
      },
    });

    super(
      {
        children: { slot: uploaderView },
      },
      {}
    );

    this.uploaderView = uploaderView;
  }

  connectToStore = (storeState: Partial<StoreState>) => {
    const { user } = storeState;

    if (!user) {
      return;
    }

    setTimeout(() => {
      if (this.uploaderView) {
        this.uploaderView.setProp('src', user.avatar || '');
      }
    });
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
  }

  render() {
    return '{{{slot}}}';
  }
}
