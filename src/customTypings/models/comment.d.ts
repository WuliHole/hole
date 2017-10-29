
interface IComment {
  author: User
  comment: any
  id: string
  date: string
}

interface CommentPayload {
  author: User
  comment: any
  postId: string
}
