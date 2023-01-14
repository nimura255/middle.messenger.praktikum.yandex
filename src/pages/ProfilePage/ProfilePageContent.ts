import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { navigate } from '$core/router';
import { makeChildrenFromList } from '$core/Block';
import { AvatarUploader } from '$components/AvatarUploader';
import { ProfileInfoRecordField } from '$components/profileFields';
import { appController } from '$controllers/app';
import { authController } from '$controllers/auth';
import { ControlField } from './ControlField';
import { mockFields } from './constants';

export class ProfilePageContent extends Block {
  constructor() {
    const avatarUploader = new AvatarUploader({
      name: 'avatar',
      src: '',
    });

    const infoFields = mockFields.map((params) => {
      return new ProfileInfoRecordField(params);
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
