export function getContentState(
  stringContent: string
) {
  const contentState = {
    entityMap: {},
    blocks: [
      {
        key: '1eo6v',
        text: stringContent,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 1, length: 10, style: 'BOLD'
          }
        ],
        entityRanges: [],
        data: {}
      }
    ]
  }
  return contentState
}


