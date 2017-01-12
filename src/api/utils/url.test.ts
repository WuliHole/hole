import { URL_SEARCH_DELIMITER, urlQueryConstructor } from './url'

describe('UrllQueryConstructor', () => {
  it('should construct right url query string', () => {
    const o1 = {
      lastName: 'chan',
      firstName: 'jacky',
    }
    const o2 = {
      uid: 666,
      tokens: 'apple',
      time: 20170111
    }

    expect(urlQueryConstructor(o1))
      .toBe(`lastName=chan${URL_SEARCH_DELIMITER}firstName=jacky`)

    expect(urlQueryConstructor(o2))
      .toBe(
      'uid=666'
      + URL_SEARCH_DELIMITER
      + 'tokens=apple'
      + URL_SEARCH_DELIMITER
      + 'time=20170111'
      )
  })

  it('should return empty string when params is None', () => {
    expect(urlQueryConstructor('')).toBe('')
    expect(urlQueryConstructor(undefined)).toBe('')
    expect(urlQueryConstructor({})).toBe('')
  })

})
