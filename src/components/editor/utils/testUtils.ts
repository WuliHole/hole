export function getContentState(
  stringContent: string
): Draft.Model.Encoding.RawDraftContentState {
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
  return contentState as Draft.Model.Encoding.RawDraftContentState
}
