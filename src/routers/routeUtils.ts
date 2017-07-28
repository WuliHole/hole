import isLogin from '../store/isLogin'
export function notLoggedInRequired(redirectPath) {
  return (nextState, replaceState) => {
    if (isLogin()) {
      replaceState({ nextPathname: nextState.location.pathname }, redirectPath)
    }
  }
}


export function loginRequired(redirectPath) {
  return (nextState, replaceState) => {
    if (!isLogin()) {
      replaceState({ nextPathname: nextState.location.pathname }, redirectPath)
    }
  }
}

