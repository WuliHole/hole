
/**
 * function f provide value to make sure if it exist
 */
export function unique<T>(xs: T[], f?: (value: T) => any): T[] {
  if (!xs) {
    throw new Error('invalid array')
  }

  if (xs.length === 0) {
    return xs
  }

  let mem = []
  let result = []

  xs.forEach(v => {
    const value = f ? f(v) : v
    if (mem.indexOf(value) === -1) {
      result.push(v)
      mem.push(value)
    }
  })
  return result
}
