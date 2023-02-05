export function getMonthName(month: number) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[month];
}

export function extractReadableTime(date: Date): string {
  const timeString = date.toTimeString();
  const match = timeString.match(/\d\d:\d\d/);

  return match?.[0] || '';
}

export function extractReadableFullDate(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formatDateToken = (token: number) => {
    return token < 10 ? `0${token}` : `${token}`;
  };

  const formattedDay = formatDateToken(day);
  const formattedMonth = formatDateToken(month + 1);

  return `${formattedDay}.${formattedMonth}.${year}`;
}

function getWeekDayName(weekDayNumber: number) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return weekDays[weekDayNumber];
}

function isCurrentDay(date: Date): boolean {
  const currentDate = new Date();

  return currentDate.toDateString() === date.toDateString();
}

function isCurrentWeek(date: Date): boolean {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentWeekDay = currentDate.getDay();

  const currentWeekStart = new Date();
  currentWeekStart.setDate(currentDay - currentWeekDay);

  return date >= currentWeekStart;
}

export function formatMessageDateString(dateString: string) {
  const date = new Date(dateString);
  const readableTime = extractReadableTime(date);

  if (!isCurrentWeek(date)) {
    return extractReadableFullDate(date);
  }

  if (!isCurrentDay(date)) {
    return `${readableTime} ${getWeekDayName(date.getDay())}`;
  }

  return readableTime;
}

export function isSameYear(
  firstDate: string | Date,
  secondDate: string | Date
) {
  const firstDateObj =
    firstDate instanceof Date ? firstDate : new Date(firstDate);
  const secondDateObj =
    secondDate instanceof Date ? secondDate : new Date(secondDate);

  return firstDateObj.getFullYear() === secondDateObj.getFullYear();
}

export function isSameDay(
  firstDate: string | Date,
  secondDate: string | Date
) {
  const firstDateObj =
    firstDate instanceof Date ? firstDate : new Date(firstDate);
  const secondDateObj =
    secondDate instanceof Date ? secondDate : new Date(secondDate);

  const firstDay = firstDateObj.getDate();
  const firstMonth = firstDateObj.getMonth();
  const firstYear = firstDateObj.getFullYear();
  const secondDay = secondDateObj.getDate();
  const secondMonth = secondDateObj.getMonth();
  const secondYear = secondDateObj.getFullYear();

  return (
    firstDay === secondDay &&
    firstMonth === secondMonth &&
    firstYear === secondYear
  );
}
