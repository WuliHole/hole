import { ContentState, ContentBlock } from 'draft-js'
import { OrderedMap } from 'immutable'
import { getAllEntityBlock } from './getAllEntityBlock'
import { isValidBlock } from './isValidBlock'

type BlockMap = OrderedMap<string, ContentBlock>
function removeAllInvalidBlock(contentState: ContentState): ContentState {
  const blockMap = contentState.getBlockMap()
  const blocks = getAllEntityBlock(blockMap)
  const invalidBlockKey: string[] = []
  blocks.forEach((block, index) => {
    if (!isValidBlock(contentState, block)) {
      invalidBlockKey.push(block.getKey())
    }
  })

  let newBlockMap: BlockMap = blockMap
  invalidBlockKey.forEach(key => newBlockMap = newBlockMap.remove(key))

  const newContentState = contentState.set('blockMap', newBlockMap)
  return newContentState as ContentState
}

export default removeAllInvalidBlock

