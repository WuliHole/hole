import Builder from './initQiniuBuilder'

describe('QiNiu Builder', () => {
  it('it should be return qiniu4j object', () => {
    const s1 = Builder({

    })
    expect(s1).toBeTruthy()
  })
})

