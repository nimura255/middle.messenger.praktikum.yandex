import { Button } from './realComponents/button/Button';
import { UserProfile } from './realComponents/userProfile/UserProfile';
import { renderDOM } from './core/renderDOM';
import './styles/styles.pcss';

const button = new Button({
  className: 'mfm-button mfm-button_primary',
  child: 'Click me',
  events: {
    click: (event) => {
      console.log(event);
    },
  },
});

const userProfile = new UserProfile({
  children: { button },
});

renderDOM('#app', userProfile);

// setTimeout(() => {
//   button.setProps({
//     className: 'mfm-button mfm-button_primary',
//     child: 'Click me, please',
//   });
// }, 3000);
