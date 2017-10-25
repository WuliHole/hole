import createPlugin from 'draft-js-image-plugin'
import { EditorState, ContentBlock } from 'draft-js'
import './style.less'
export const createImagePlugin = (config?: PluginConfig): ImagePluginObject => {
  const originProps = createPlugin(config)
  const { blockRendererFn } = originProps

  function wrappedBlockRendererFn(block: ContentBlock, ...args) {
    if (!block) {
      return null
    }

    if (block.getType() === 'atomic') {

      const entityKey = block.getEntityAt(0)
      if (!entityKey) {
        return null
      }

      const { getEditorState } = args[0]
      const state: EditorState = getEditorState()
      const type = state.getCurrentContent().getEntity(entityKey).getType()
      if (type === 'image') {
        return blockRendererFn(block, ...args)
      }

    }
    return null
  }

  return {
    ...originProps,

    blockRendererFn: wrappedBlockRendererFn,

    blockStyleFn(block: ContentBlock, { getEditorState }) {
      const entityKey = block.getEntityAt(0);
      const contentState = getEditorState().getCurrentContent();
      const alignmentData = entityKey ? contentState.getEntity(entityKey).data : {};

      if (alignmentData.src) {
        switch (alignmentData.alignment) {
          case 'left':
            return 'img-align-left'

          case 'right':
            return 'img-align-right'

          case 'center':
            return 'img-align-center'

          case 'default':
            return 'img-no-margin'
        }
      }
    }
  }
}

interface PluginConfig {
  imageComponent?: React.ComponentClass<any>
  theme?: {
    image?: string
  }
  decorator: any
}

interface ImagePluginObject {
  addImage: AddImageBlock
}

export type AddImageBlock = (editorState: EditorState, url: string, extraData: any) => EditorState