import resolveTitleFromContent from './resolveTitleFromContent'
import { RawDraftContentState } from 'draft-js';
describe('Test function resolveTitleFromContent ', () => {
  it('should  rightly get title ', () => {
    const content: RawDraftContentState = {
      'entityMap': {},
      'blocks': [
        {
          'key': '3vusq',
          'text': 'asdzzzzza',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        }
      ]
    }
    const title = resolveTitleFromContent(content)
    expect(title).toEqual(content.blocks[0].text)
  })

  it('it should truncate title if greate than max length(20)', () => {
    const content: RawDraftContentState = {
      'entityMap': {},
      'blocks': [
        {
          'key': '3vusq',
          'text': 'asdzzzzzaasdasdasdasdasdasdasdasdasdasdasd',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        }
      ]
    }
    const title = resolveTitleFromContent(content)
    const truncatedTitle = content.blocks[0].text.slice(0, 20) + '...'
    expect(title).toEqual(truncatedTitle)
  })

  it('it should get default title', () => {
    const content: RawDraftContentState = {
      'entityMap': {},
      'blocks': [
      ]
    }
    const title = resolveTitleFromContent(content)
    expect(title).toEqual('未命名')
  })

  it('it should get default title with empty text', () => {
    const content: RawDraftContentState = {
      'entityMap': {},
      'blocks': [
        {
          'key': '3vusq',
          'text': '',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        }
      ]
    }
    const title = resolveTitleFromContent(content)
    expect(title).toEqual('未命名')

    const content2: RawDraftContentState = {
      'entityMap': {},
      'blocks': [
        {
          'key': '3vusq',
          'text': '              ',
          'type': 'unstyled',
          'depth': 0,
          'inlineStyleRanges': [],
          'entityRanges': [],
          'data': {}
        }
      ]
    }
    const title1 = resolveTitleFromContent(content)
    expect(title1).toEqual('未命名')
  })
})