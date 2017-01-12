export function debug(message: string) {
  if (__TEST__ || __DEV__) {
    console.debug(message)
  }
}
