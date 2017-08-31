import { RawDraftContentState } from 'draft-js';
const defaultTitle = '未命名'
const SPACE = /\s+/
const MAX_LENGTH = 20
function resolveTitleFromContent(content: RawDraftContentState): string {
  if (!content) {
    return
  }
  const firstBlock = content.blocks[0]
  if (firstBlock) {
    const text = firstBlock.text && firstBlock.text.replace(SPACE, '')

    if (!text) {
      return defaultTitle
    }

    if (text.length > MAX_LENGTH) {
      return text.slice(0, MAX_LENGTH) + '...'
    } else {
      return text
    }

  } else {
    return defaultTitle
  }
}

export default resolveTitleFromContent