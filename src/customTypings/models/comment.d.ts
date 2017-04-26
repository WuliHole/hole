
interface IComment {
  author: User
  comment: any
  id: string
  date: string
}

interface ICommentServerResponse {
  author: User
  comment: any
  postId: string
}
