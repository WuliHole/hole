import { convertFromRaw } from 'draft-js';
import { Serlizer } from './serializer'
import { getAllEntityBlock } from './getAllEntityBlock'
import { getContentState } from './testUtils'

describe('Test getAllEntityBlock function', () => {

  it('it should return all block that has eneity', () => {
    /* tslint:disable */
    let rawContent: any = {
      entityMap: {
        "0": { "type": "image", "mutability": "IMMUTABLE", "data": { "src": "http://lowsweet.qiniudn.com/FmFUKRzldlnKdR4N_TIp7P2B6m41", "valid": true } },

        "1": { "type": "image", "mutability": "IMMUTABLE", "data": { "src": "http://lowsweet.qiniudn.com/FmFUKRzldlnKdR4N_TIp7P2B6m41", "valid": true } }
      },
      blocks: [
        {
          "key": "f2dn3",
          "text": "asd",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        },
        {
          "key": "5qu3r",
          "text": " ",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [{ "offset": 0, "length": 1, "key": 0 }],
          "data": {}
        },
        {
          "key": "qq3rc",
          "text": " ",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [{ "offset": 0, "length": 1, "key": 1 }],
          "data": {}
        },
        {
          "key": "6rmep",
          "text": "", "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {}
        }
      ]
    }
    /* tslint:enable */
    const state = Serlizer.deserialize(rawContent)
    const t = getAllEntityBlock(state.getBlockMap())
    expect(t.size).toEqual(2)
    expect(t.get(0).getKey()).toBe('5qu3r')
    expect(t.get(1).getKey()).toBe('qq3rc')
  })

  it('should return empty list', () => {
    const state = Serlizer.deserialize(getContentState('sss') as any)
    const r = getAllEntityBlock(state.getBlockMap())
    expect(r.size).toBe(0)
  })
})