///

/**
 * example {
          id: 1,
          title: "hello world",
          content: {

          },
          authorId: 201,
          createdAt: "2017-04-13T12:41:17.996Z",
          updatedAt: "2017-04-13T12:41:17.996Z"
          },
 */
interface Post<T> {

  id: number
  title: string
  content: T
  /**
   * user id which is author
   */
  authorId: number
  /**
   * Date stirng
   */
  createdAt: string
  /**
   * Date string
   */
  updatedAt: string
}
