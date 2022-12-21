import { Block, type BaseProps } from '$core/Block';

export class UserProfile extends Block {
  constructor(props: BaseProps) {
    super(props, {});
  }

  componentDidMount(props: BaseProps) {
    console.log('User profile mounted', props);
  }

  render() {
    return `
      <div style="background: red; padding: 20px">
        {{{button}}}
      </div>
    `;
  }
}
