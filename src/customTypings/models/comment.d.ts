
interface IComment {
  author: User
  content: any
  id: string
  date: string
}

interface ICommentServerResponse {
  author: User
  content: any
  postId: string
}
