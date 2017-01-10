type PluginEditorProps = {
  plugins: any[]
  decorators: any[]
} & Draft.Component.Base.DraftEditorProps
type EditorState = Draft.Model.ImmutableData.EditorState
declare module 'draft-js-plugins-editor' {
  export function createEditorStateWithText(s): EditorState

  export default class Editor extends React.Component<PluginEditorProps, any> {

  }
}
