import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { navigate } from '$core/router';
import { makeChildrenFromList } from '$core/Block';
import { AvatarUploader } from '$components/AvatarUploader';
import { ProfileInfoRecordField } from '$components/profileFields';
import { appController } from '$controllers/app';
import { authController } from '$controllers/auth';
import { store } from '$store';
import { ControlField } from './ControlField';
import { fieldsParams } from './constants';

export class ProfilePageContent extends Block {
  infoFields: ProfileInfoRecordField[] = [];
  avatarUploader: AvatarUploader;

  constructor() {
    const avatarUploader = new AvatarUploader({
      name: 'avatar',
      src: '',
    });

    const infoFields = fieldsParams.map(({ label }) => {
      return new ProfileInfoRecordField({ name: label, value: '' });
    });

    const changeInfoButton = new ControlField({
      text: 'Change personal info',
      events: {
        click: () => navigate(routes.changeInfo),
      },
    });

    const changePasswordButton = new ControlField({
      text: 'Change password',
      events: {
        click: () => navigate(routes.changePassword),
      },
    });

    const logoutButton = new ControlField({
      text: 'Logout',
      events: {
        click: async () => {
          appController.setLoadingSpinnerStatus(true);
          await authController.logOut();
          appController.setLoadingSpinnerStatus(false);
        },
      },
    });

    const { template: infoFieldsTemplate, children: infoFieldsRecord } =
      makeChildrenFromList(infoFields, 'info');

    const propsWithChildren = {
      infoFieldsTemplate,
      children: {
        ...infoFieldsRecord,
        avatarUploader,
        changeInfoButton,
        changePasswordButton,
        logoutButton,
      },
    };

    super(propsWithChildren, {});

    this.infoFields = infoFields;
    this.avatarUploader = avatarUploader;
  }

  componentDidMount() {
    store.subscribeWithImmediateCall((state) => {
      const { user } = state;

      if (!user) {
        return;
      }

      this.infoFields.map((fieldBlock, index) => {
        const fieldName = fieldsParams[index].name;
        const fieldValue = user[fieldName];
        fieldBlock.setProp('value', fieldValue);
      });
      this.avatarUploader.setProp('src', user.avatar);
    });
  }

  render(): string {
    return `
    <div class="mfm-profile-page__main__content">
      {{{avatarUploader}}}
      <div class="mfm-profile-page__fields-container">
        ${this.props.infoFieldsTemplate}
      </div>
      <div class="mfm-profile-page__fields-container">
        {{{changeInfoButton}}}
        {{{changePasswordButton}}}
        {{{logoutButton}}}
      </div>
    </div>
    `;
  }
}
