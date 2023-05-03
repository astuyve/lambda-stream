import { handler } from '../examples/src/handler'

describe('simple handler', () => {
  it('awaits and returns the response', async () => {
    const resp = await handler('hello')
    expect(resp).toEqual('Hello, world!')
  })
})
