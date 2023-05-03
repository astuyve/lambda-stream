const { gzip } = require('../examples/example.js')

describe('simple handler', () => {
  it('awaits and returns the response', async () => {
    const resp = await gzip('hello')
    const parsed = JSON.parse(resp)
    expect(parsed).toMatchObject({ hello: 'world' })
  })
})
