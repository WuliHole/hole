import { RawDraftContentState } from 'draft-js';
const defaultTitle = '未命名'
const SPACE = /\s+/
const MAX_LENGTH = 20
const BACK_SLASH = /\//g
const filterBlocks = ['atomic', 'code-block']
const filterKeyWord = [SPACE, BACK_SLASH]

function resolveTitleFromContent(content: RawDraftContentState): string {
  if (!content) {
    return
  }

  let targetBlock
  const len = content.blocks.length
  for (let i = 0; i < len; i++) {
    const block = content.blocks[i]
    if (filterBlocks.indexOf(block.type) === -1) {
      targetBlock = block
      break
    }
  }

  if (targetBlock) {
    const text = targetBlock.text && filterKeyWord.reduce((acc, rule) => acc.replace(rule, ''), targetBlock.text)

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