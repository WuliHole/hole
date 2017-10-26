/**
 *
 * @param el
 * @return {number} line number of cursor,start from 1
 */
export function getCursorPosition(el: HTMLInputElement) {
  const contents = el.value.split('\n')
  const len = contents.length
  const { selectionStart } = el
  let total = 0
  for (let i = 0; i < len; i++) {
    // we should +1, because "\n" was removed before
    const lengthOfCurrentLine = contents[i].length + 1
    const j = (total + lengthOfCurrentLine - selectionStart) >= 0
    if (j) {
      return i + 1
    }
    total += lengthOfCurrentLine
  }
  return -1
}