type SubmittedMessageData = {
  text: string;
};

export type MessageInputFormProps = {
  onSubmit?: (data: SubmittedMessageData) => void;
};
