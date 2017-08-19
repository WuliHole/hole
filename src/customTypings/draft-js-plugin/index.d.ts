type PluginEditorProps = {
  plugins: any[]
  decorators: any[]
} & any
type EditorState = any
declare module 'draft-js-plugins-editor' {
  export function createEditorStateWithText(s): EditorState

  export default class Editor extends React.Component<PluginEditorProps, any> {

  }
  export function composeDecorators(...args): Function
}
