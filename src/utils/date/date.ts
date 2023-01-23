function removeSecondsFromTimeString(timeString: string) {
  return timeString.replace(/:\d+$/, '');
}

function isMoreThanWeek(milliseconds: number) {
  const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;

  return milliseconds >= millisecondsInWeek;
}

function isMoreThanDay(milliseconds: number) {
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  return milliseconds >= millisecondsInDay;
}

function getWeekDayName(weekDayNumber: number) {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return weekDays[weekDayNumber];
}

export function formatMessageDateString(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const diff = currentDate.getTime() - date.getTime();

  if (isMoreThanWeek(diff)) {
    return date.toLocaleDateString().replace('/', '.');
  }

  if (isMoreThanDay(diff)) {
    return getWeekDayName(date.getDay());
  }

  return removeSecondsFromTimeString(date.toLocaleTimeString());
}
