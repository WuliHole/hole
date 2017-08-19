import { convertFromRaw } from 'draft-js';
import { Serlizer } from './serializer'
import { isValidBlock } from './isValidBlock'
import { getContentState } from './testUtils'

describe('Test isValidBlock function', () => {

  it('it should be return ture', () => {
    /* tslint:disable */
    let rawContent: any = {
      entityMap: {
        "0": { "type": "image", "mutability": "IMMUTABLE", "data": { "src": "http://lowsweet.qiniudn.com/FmFUKRzldlnKdR4N_TIp7P2B6m41", "valid": true } }
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
    expect(isValidBlock(state, state.getBlockForKey('5qu3r'))).toBe(true)
  })

  it('it should be return false', () => {
    /* tslint:disable */
    let rawContent: any = {
      entityMap: {
        "0": { "type": "image", "mutability": "IMMUTABLE", "data": { "src": "http://lowsweet.qiniudn.com/FmFUKRzldlnKdR4N_TIp7P2B6m41", "valid": false } }
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
    expect(isValidBlock(state, state.getBlockForKey('5qu3r'))).toBe(false)
  })
})