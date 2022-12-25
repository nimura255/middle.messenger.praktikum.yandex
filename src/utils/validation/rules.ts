export function testForRequired(value: string) {
  return !!value;
}

export function testForMin(value: string, length: number) {
  return value.length >= length;
}
export function testForMax(value: string, length: number) {
  return value.length <= length;
}

export function testForCapitalLetter(value: string) {
  return /[A-ZА-Я]/.test(value);
}

export function testForCapitalized(value: string) {
  return testForCapitalLetter(value[0]);
}

export function testForLatinWithHyphenOnly(value: string) {
  return /^[a-zA-Z-]*$/.test(value);
}

export function testForCyrillicWithHyphenOnly(value: string) {
  return /^[а-яА-ЯёЁ-]*$/.test(value);
}

export function testForNotEntirelyNumeric(value: string) {
  return /\D/.test(value);
}

export function testForLatinDigitsHyphenAndUnderscore(value: string) {
  return /^[a-zA-Z0-9-_]*$/.test(value);
}

export function testForEmail(value: string) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

export function testForContainingDigit(value: string) {
  return /\d/.test(value);
}

export function testForPhoneNumber(value: string) {
  return /^\+?\d+$/.test(value);
}
