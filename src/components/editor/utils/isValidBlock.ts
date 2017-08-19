import { ContentBlock, ContentState } from 'draft-js'
export function isValidBlock(content: ContentState, block: ContentBlock): boolean {
  let blockRaw = block.toJS()
  const entity = content.getEntity(blockRaw.characterList[0].entity)
  if (!entity) {
    return true
  } else {
    const data = entity.getData()
    return !!data.valid
  }
}