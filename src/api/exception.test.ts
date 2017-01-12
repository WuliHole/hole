import {
  InvalidParamExecption,
  UnexceptResponse
} from './execptions'

describe('Http execptions', () => {
  it('type should be InvalidParamExecption', () => {
    expect(new InvalidParamExecption().type).toBe('InvalidParamExecption')
  })
  it('type shoule be UnexceptResponse', () => {
    expect(new UnexceptResponse().type).toBe('UnexceptResponse')
  })
})
