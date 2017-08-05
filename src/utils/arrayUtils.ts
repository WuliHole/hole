export function unique<T>(xs: T[], valueExtractor?: (value: T) => any): T[] {
  if (!Array.isArray(xs)) {
    throw new Error('invalid array')
  }

  if (xs.length === 0) {
    return xs
  }

  let mem = []
  let result = []

  xs.forEach(v => {
    const value = valueExtractor ? valueExtractor(v) : v
    if (mem.indexOf(value) === -1) {
      result.push(v)
      mem.push(value)
    }
  })
  return result
}
