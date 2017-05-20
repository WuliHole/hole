import { unique } from './arrayUtils'


describe('Array Utils', () => {
  describe('unique function', () => {
    it(`it should remove duplicate value from array`, () => {
      const xs = [1, 1, 1, 1, 1]
      expect(unique(xs)).toEqual([1])
    })

    it(`it can pass a fuction for checking duplicate`, () => {
      const xs = [
        { name: 'hahaha' },
        { name: 'hahaha' },
        { name: 'hahaha' },
        { name: '666' },
      ]
      expect(unique(xs, x => x.name))
        .toEqual([{ name: 'hahaha' }, { name: '666' }])
    })
  })
})
