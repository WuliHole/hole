function getAccessToken(): string {
  const element = document.querySelector('meta[name="auth-token"]')
  if (element) {
    return element.getAttribute('content')
  }
}

function getRefreshToken(): string {
  const element = document.querySelector('meta[name="refresh-token"]')
  if (element) {
    return element.getAttribute('content')
  }
}

function getPayload() {
  const element = document.querySelector('meta[name="payload"]')
  if (element) {
    try {
      return JSON.parse(element.getAttribute('content'))
    } catch (e) {
      return null
    }
  }
}

export function preloadSession() {
  const user = getPayload()
  const token = getAccessToken()
  const refreshToken = getRefreshToken()
  return {
    token,
    refreshToken,
    user
  }
}