import createPlugin from 'draft-js-image-plugin'
import { EditorState, ContentBlock } from 'draft-js'
import './style.less'
export const createImagePlugin = (config?: PluginConfig): ImagePluginObject => {
  return {
    ...createPlugin(config),
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