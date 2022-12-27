import { Block, createRef } from '$core/Block';
import { ArrowButton } from '$components/ArrowButton';
import { clipIcon } from '$iconsTemplates';
import { extractDataFromSubmitEvent } from '$utils/form';
import { validateRequired, ValidationManager } from '$utils/validation';
import { MessageFormActionButton } from '../MessageFormActionButton';
import { MessageInput } from '../MessageInput';

export class MessageInputForm extends Block {
  constructor() {
    const attachmentButton = new MessageFormActionButton({
      iconTemplate: clipIcon,
    });
    const sendButton = new ArrowButton({
      direction: 'right',
      type: 'submit',
    });
    const messageInputRef = createRef();
    const messageInput = new MessageInput({ ref: messageInputRef });

    const formValidationManager = new ValidationManager({
      fields: [
        {
          name: 'message',
          ref: messageInputRef,
          rule: validateRequired,
        },
      ],
    });

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();

      const formValues = extractDataFromSubmitEvent(event);
      formValidationManager.validateForm(formValues);

      if (!formValidationManager.hasErrors) {
        // eslint-disable-next-line no-console
        console.log(formValues);
      }
    };

    const props = {
      children: {
        attachmentButton,
        messageInput,
        sendButton,
      },
      events: { submit: handleSubmit },
    };

    super(props, {});
  }

  render(): string {
    return `
      <form class="mfm-chat-page__chat-column__message-input-form">
        {{{attachmentButton}}}
        {{{messageInput}}}
        {{{sendButton}}}
      </form>
    `;
  }
}
