import { ContentBlock, ContentState } from 'draft-js';
import { Serlizer } from './serializer'
import removeAllInvalidBlock from './removeAllinvalidBlock'
import { getContentState } from './testUtils'

describe('Test revemoAllinvalidBlock function', () => {

  describe('Has one invalid block', () => {
    it('It should remove invalid block , size to be 3', () => {
      /* tslint:disable */
      let rawContent: any = {
        entityMap: {
          "0": { "type": "image", "mutability": "IMMUTABLE", "data": { "src": "http://lowsweet.qiniudn.com/FmFUKRzldlnKdR4N_TIp7P2B6m41", "valid": true } },

          "1": { "type": "image", "mutability": "IMMUTABLE", "data": { "src": "http://lowsweet.qiniudn.com/FmFUKRzldlnKdR4N_TIp7P2B6m41", "valid": false } }
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
      const t = removeAllInvalidBlock(state)

      expect((t as ContentState).getBlockForKey('qq3rc')).toBe(undefined)
      expect((t as ContentState).getBlockMap().size).toBe(3)

      const rawContentState = Serlizer.serialize(t as ContentState)
      console.debug('After Demoved Data: ', JSON.stringify(t))
      expect(rawContentState.entityMap['0']).toBeTruthy()
      expect(rawContentState.entityMap['1']).toBeUndefined()
    })
  })

  describe('All eneity block is valid', () => {
    it('Should remove nothing , size to be 4', () => {
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
      const t = removeAllInvalidBlock(state)

      expect((t as ContentState).getBlockForKey('qq3rc')).toBeDefined()
      expect((t as ContentState).getBlockForKey('5qu3r')).toBeDefined()
      expect((t as ContentState).getBlockMap().size).toBe(4)
    })
  })

  describe('Without eneity block case', () => {
    it('Should remove nothing', () => {
      /* tslint:disable */
      let rawContent: any = {
        entityMap: {

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
      const t = removeAllInvalidBlock(state)
      expect((t as ContentState).getBlockMap().size).toBe(2)
    })
  })
})