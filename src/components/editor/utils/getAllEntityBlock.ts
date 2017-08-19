import { ContentState, ContentBlock } from 'draft-js'
import { OrderedMap } from 'immutable'
type BlockMap = OrderedMap<string, ContentBlock>
export function getAllEntityBlock(blockMap: BlockMap) {
  return blockMap.filter((v, key) => {
    let block = v.toJS()
    return block.type === 'atomic'
      && block.characterList.length > 0
      && (!!block.characterList[0].entity)  // has entity
  }).toList()
}
