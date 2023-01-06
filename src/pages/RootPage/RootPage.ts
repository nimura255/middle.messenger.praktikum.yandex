import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/Block';
import { ListItem } from './ListItem';

export class RootPage extends Block {
  constructor() {
    const linksParams = [
      {
        path: routes.signIn,
        name: 'Sign in',
      },
      {
        path: routes.signUp,
        name: 'Sign up',
      },
      {
        path: routes.messenger,
        name: 'Chat',
      },
      {
        path: routes.settings,
        name: 'Profile info',
      },
      {
        path: routes.changeInfo,
        name: 'Profile edit',
      },
      {
        path: routes.changePassword,
        name: 'Password edit',
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
