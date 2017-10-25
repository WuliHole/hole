import { AtomicBlockUtils, Entity, EditorState } from 'draft-js'
export function addTexBlock(editorState: EditorState) {
  const content = editorState.getCurrentContent().createEntity(
    'TOKEN',
    'IMMUTABLE',
    { content: '', type: 'tex', valid: true }
  )

  const entityKey = content.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState,
    { currentContent: content },
  );
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}