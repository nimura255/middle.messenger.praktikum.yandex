import {
  extractReadableFullDate,
  getMonthName,
  isSameDay,
  isSameYear,
} from '$utils/date';

export function formatDate(date: string) {
  const dateObject = new Date(date);
  const todayDate = new Date();

  if (isSameDay(dateObject, todayDate)) {
    return 'Today';
  }

  if (isSameYear(date, new Date())) {
    const month = getMonthName(dateObject.getMonth());
    const day = dateObject.getDate();

    return `${month} ${day}`;
  }

  return extractReadableFullDate(dateObject);
}
