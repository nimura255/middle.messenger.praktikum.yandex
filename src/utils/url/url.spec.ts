import { urlJoin } from './url';

describe('utils/url/urlJoin', () => {
  it('Joins url segments', () => {
    const segments = ['one', 'two', 'three'];
    const expectedResult = 'one/two/three';

    const result = urlJoin(...segments);

    expect(result).toBe(expectedResult);
  });

  it("Doesn't make consequential slashes", () => {
    const segments = ['one/', '/two/', '/three'];
    const expectedResult = 'one/two/three';

    const result = urlJoin(...segments);

    expect(result).toBe(expectedResult);
  });

  it('Omits segment if its empty', () => {
    const segments = ['one', ''];
    const expectedResult = 'one';

    const result = urlJoin(...segments);

    expect(result).toBe(expectedResult);
  });

  it("Doesn't remove slashes if segment is protocol", () => {
    const segments = ['https://', 'two/', '/three'];
    const expectedResult = 'https://two/three';

    const result = urlJoin(...segments);

    expect(result).toBe(expectedResult);
  });
});
