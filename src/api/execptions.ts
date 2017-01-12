class HTTPExecption extends Error {
  public type

  constructor(type: string, message = '') {
    super()
    this.name = type
    this.type = type
    this.message = `[HTTP expecption => ${type} Error]:${message}`
  }
}

export class InvalidParamExecption extends HTTPExecption {
  constructor(message?: string) {
    super('InvalidParamExecption', message)
  }
}

export class UnexceptResponse extends HTTPExecption {
  constructor(message?: string) {
    super('UnexceptResponse', message)
  }
}
