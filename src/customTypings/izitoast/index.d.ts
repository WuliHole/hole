declare module 'izitoast' {
  interface Options {
    title: string
    message: string
  }

  class Toast {
    static success: (o: Options) => void
    static warning: (o: Options) => void
    static error: (o: Options) => void
    static info: (o: Options) => void
  }
  export = Toast
}