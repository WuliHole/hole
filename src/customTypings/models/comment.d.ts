
interface IComment {
  author: User
  content: Draft.Model.Encoding.RawDraftContentState
  id: string
  date: string
}

interface ICommentServerResponse {
  author: User
  content: Draft.Model.Encoding.RawDraftContentState
  postId: string
}
