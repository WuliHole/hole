import { convertToRaw, convertFromRaw, ContentState } from 'draft-js'
type RawContentState = Draft.Model.Encoding.RawDraftContentState

export class Serlizer {

  public static serialize(contentState: ContentState): RawContentState {
    return convertToRaw(contentState)
  }

  public static deserialize(rawState: RawContentState): ContentState {
    return convertFromRaw(rawState)
  }
}
