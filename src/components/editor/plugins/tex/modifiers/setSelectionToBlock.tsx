import * as DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import { SelectionState, EditorState, ContentBlock } from 'draft-js';
// Set selection of editor to next/previous block
export default (editorState: EditorState, setEditorState, newActiveBlock: ContentBlock) => {

  // TODO verify that always a key-0-0 exists
  const offsetKey = DraftOffsetKey.encode(newActiveBlock.getKey(), 0, 0);
  const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
  // set the native selection to the node so the caret is not in the text and
  // the selectionState matches the native selection
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStart(node, 0);
  range.setEnd(node, 0);
  selection.removeAllRanges();
  selection.addRange(range);

  setEditorState(EditorState.forceSelection(editorState, new SelectionState({
    anchorKey: newActiveBlock.getKey(),
    anchorOffset: 0,
    focusKey: newActiveBlock.getKey(),
    focusOffset: 0,
    hasFocus: true,
    isBackward: false,
  })));
};
