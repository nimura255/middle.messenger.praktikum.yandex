import { Block } from '$core/Block';
import { Avatar } from '$components/Avatar';
import type { AvatarUploaderProps } from './types';
import './styles.pcss';

export class AvatarUploader extends Block {
  avatar: Avatar;

  constructor(props: AvatarUploaderProps) {
    const avatar = new Avatar({
      src: props.src,
    });

    const propsWithChildren = {
      ...props,
      children: { avatar },
    };

    super(propsWithChildren, {});
    this.avatar = avatar;
  }

  componentDidUpdate(
    _: AvatarUploaderProps,
    newProps: AvatarUploaderProps
  ) {
    if (newProps.src) {
      this.avatar.setProp('src', newProps.src);
    }
  }

  render(): string {
    return `
      <label class="mfm-avatar-uploader">
        <input
          name="{{name}}"
          class="mfm-avatar-uploader__input"
          type="file"
        >
        {{{avatar}}}
        <p class="mfm-avatar-uploader__hover-overlay mfm-typography__text_s">
          Upload new picture
        </p>
      </label>
    `;
  }
}
