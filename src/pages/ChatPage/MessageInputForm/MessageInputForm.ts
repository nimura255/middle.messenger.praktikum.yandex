import { Block, createRef } from '$core/Block';
import { ArrowButton } from '$components/ArrowButton';
import { clipIcon } from '$iconsTemplates';
import { extractDataFromSubmitEvent } from '$utils/form';
import { validateRequired, ValidationManager } from '$utils/validation';
import { MessageFormActionButton } from '../MessageFormActionButton';
import { MessageInput } from '../MessageInput';
import type { MessageInputFormProps } from './types';

export class MessageInputForm extends Block {
  constructor(props: MessageInputFormProps) {
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

    const clearInput = () => {
      const element = messageInputRef.current?.element as
        | HTMLInputElement
        | undefined;

      if (element) {
        element.value = '';
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();

      const onSubmit = this.props
        .onSubmit as MessageInputFormProps['onSubmit'];
      const formValues = extractDataFromSubmitEvent(event);
      formValidationManager.validateForm(formValues);

      if (!onSubmit || formValidationManager.hasErrors) {
        return;
      }

      const { message } = formValues;
      onSubmit({ text: message });
      clearInput();
    };

    const propsWithChildren = {
      ...props,
      children: {
        attachmentButton,
        messageInput,
        sendButton,
      },
      events: { submit: handleSubmit },
    };

    super(propsWithChildren, {});
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
