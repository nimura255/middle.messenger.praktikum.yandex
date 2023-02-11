import { formatMessageDateString } from './date';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2023-01-31T23:59:00'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('utils/date/formatMessageDateString', () => {
  it('Returns HH:MM if date was during current day', () => {
    const maxDate = '2023-01-31T23:58:00';
    const minDate = '2023-01-31T00:00:00';

    const formattedMaxDate = formatMessageDateString(maxDate);
    const formattedMinDate = formatMessageDateString(minDate);

    expect(formattedMaxDate).toBe('23:58');
    expect(formattedMinDate).toBe('00:00');
  });

  it('Returns HH:MM WEEKDAY if date was during current week more than one day ago', () => {
    const validDate1 = '2023-01-30T23:59:00';
    const validDate2 = '2023-01-29T23:59:00';
    const exceedingDate = '2023-01-28T23:59:00';

    const formattedDate1 = formatMessageDateString(validDate1);
    const formattedDate2 = formatMessageDateString(validDate2);
    const formattedExceedingDate = formatMessageDateString(exceedingDate);

    expect(formattedDate1).toBe('23:59 Mon');
    expect(formattedDate2).toBe('23:59 Sun');
    expect(formattedExceedingDate).not.toBe('23:59 Sat');
  });

  it('Returns DD.MM.YYYY if date was week ago or more', () => {
    const minValidDate = '2023-01-28T23:59:00';

    const formattedValidDate = formatMessageDateString(minValidDate);

    expect(formattedValidDate).toBe('28.01.2023');
  });
});
