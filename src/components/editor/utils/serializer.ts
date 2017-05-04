import {
  convertToRaw,
  convertFromRaw,
  ContentState,
  RawDraftContentState
} from 'draft-js'


export class Serlizer {

  public static serialize(contentState: ContentState): RawDraftContentState {
    if (contentState) {
      return convertToRaw(contentState)
    }
  }

  public static deserialize(rawState: RawDraftContentState): ContentState {
    try {
      return convertFromRaw(rawState)
    } catch (e) {
      throw new Error(`${e.message} \n  unexcept RawState :${rawState}`)
    }
  }
}
