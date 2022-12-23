export function testForCyrillic(value: string) {
  return /[а-яА-ЯёЁ]/.test(value);
}

export function testForCyrillicOnly(value: string) {
  return /^[а-яА-ЯёЁ]*$/.test(value);
}

export function testForLatin(value: string) {
  return /[a-zA-Z]/.test(value);
}

export function testForLatinOnly(value: string) {
  return /^[a-zA-Z]*$/.test(value);
}

export function testForOnlyNumeric(value: string) {
  return /\d/.test(value);
}

export function testForOnlyNumericOnly(value: string) {
  return /^\d*$/.test(value);
}

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

export function testForCanContainHyphen(value: string) {
  return !/^[A-Za-zА-Яа-яёЁ0-9-]*$/gm.test(value);
}

export function testForCanContainUnderScore(value: string) {
  return !/^[A-Za-zА-Яа-яёЁ0-9-_]*$/gm.test(value);
}

export function testForNoSpaces(value: string) {
  return /\S/.test(value);
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
  return /^\+?\d+/.test(value);
}
