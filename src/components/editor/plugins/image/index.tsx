import createPlugin from 'draft-js-image-plugin'
import { EditorState } from 'draft-js'

export const createImagePlugin = (config?: PluginConfig): ImagePluginObject => {
  return createPlugin(config)
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