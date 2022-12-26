import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/Block';
import { ListItem } from './ListItem';

export class RootPage extends Block {
  constructor() {
    const linksParams = [
      {
        path: '/signIn',
        name: 'Sign in',
      },
      {
        path: '/signUp',
        name: 'Sign up',
      },
      {
        path: '/chat',
        name: 'Chat',
      },
      {
        path: '/profile',
        name: 'Profile info',
      },
      {
        path: '/profile/changeInfo',
        name: 'Profile edit',
      },
      {
        path: '/profile/changePassword',
        name: 'Password edit',
      },
      {
        path: '/404',
        name: '404',
      },
      {
        path: '/500',
        name: '500',
      },
    ];

    const listItems = linksParams.map((params) => new ListItem(params));

    const { children, template } = makeChildrenFromList(listItems);

    const propsWithChildren = {
      children,
      listTemplate: template,
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <main>
        <ul>
          ${this.props.listTemplate}
        </ul>
      </main>
    `;
  }
}
