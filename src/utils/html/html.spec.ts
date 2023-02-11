import { createClassList } from './html';

describe('utils/html/createClassList', () => {
  it('Accepts strings', () => {
    const tokens = ['foo', 'bar'];
    const expectedResult = tokens.join(' ');

    const result = createClassList(...tokens);

    expect(result).toBe(expectedResult);
  });

  it('Accepts Record<string, boolean | null> items', () => {
    const result = createClassList(
      { tar: null },
      { foo: true },
      { baz: false },
      { bar: true }
    );

    expect(result).toBe('foo bar');
  });

  it('Allows booleans', () => {
    const result = createClassList(false, true);

    expect(result).toBe('');
  });

  it('Accepts numbers (except zeroes)', () => {
    const result = createClassList(0, 1, 2, 3, 4);

    expect(result).toBe('1 2 3 4');
  });

  it('Accepts null and undefined', () => {
    const result = createClassList(null, 'foo', undefined, 'bar');

    expect(result).toBe('foo bar');
  });

  it('Accepts arrays', () => {
    const result = createClassList([0, 1, 2, 3, 4], [5, 6, 7, [8, 9, 10]]);

    expect(result).toBe('1 2 3 4 5 6 7 8 9 10');
  });

  it('Allows to combine acceptable types', () => {
    const result = createClassList(
      'bar',
      [1, null, 'baz', ['foo', 'test']],
      { baz: true },
      '3'
    );

    expect(result).toBe('bar 1 baz foo test baz 3');
  });
});
