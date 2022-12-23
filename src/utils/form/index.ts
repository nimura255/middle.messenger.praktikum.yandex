export function extractDataFromSubmitEvent(event: SubmitEvent) {
  const formElement = event.target as HTMLFormElement;
  const formData = new FormData(formElement);
  const result: Record<string, FormDataEntryValue> = {};

  for (const [name, value] of formData) {
    result[name] = value;
  }

  return result;
}
