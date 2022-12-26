import { Block } from '$core/Block';
import { navigate } from '$core/router';
import { makeChildrenFromList } from '$core/makeChildrenFromList';
import { AvatarUploader } from '$components/AvatarUploader';
import { ProfileInfoRecordField } from '$components/profileFields';
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
        click: () => navigate('/profile/changeInfo'),
      },
    });

    const changePasswordButton = new ControlField({
      text: 'Change password',
      events: {
        click: () => navigate('/profile/changePassword'),
      },
    });

    const logoutButton = new ControlField({
      text: 'Logout',
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
