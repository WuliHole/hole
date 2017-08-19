import {
  convertToRaw,
  convertFromRaw,
  ContentState,
  RawDraftContentState
} from 'draft-js'
import removeAllInvalidBlock from './removeAllinvalidBlock'

const defaultMiddlewares: SerlizeMiddleware[] = [
  removeAllInvalidBlock
]

export type SerlizeMiddleware = (contentState: ContentState) => ContentState

export class Serlizer {

  public static serialize(contentState: ContentState, middlewares?: SerlizeMiddleware[]): RawDraftContentState {
    const composedMiddleware = middlewares ? [...defaultMiddlewares, ...middlewares] : [...defaultMiddlewares]

    composedMiddleware.forEach(func => {
      if (typeof func !== 'function') {
        return
      }

      try {
        contentState = func(contentState)
      } catch (e) {
        console.error(e)
      }
    })

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
