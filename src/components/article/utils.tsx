const DILIMITER = '-'

export function linkifyTitle(title: string): string {
  const tokens = _tokenize(title)
  return tokens.join(DILIMITER)
}

function _tokenize(s: string) {
  return s && s.split(' ')
}
