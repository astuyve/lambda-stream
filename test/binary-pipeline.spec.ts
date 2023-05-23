import { binaryBase64Handler } from '../examples/src/binary-base64-handler'

describe('simple handler', () => {
  it('awaits and returns the response', async () => {
    const resp = await binaryBase64Handler('hello')
    const decodedMessage = Buffer.from(resp.body, 'base64').toString()
    expect(decodedMessage).toEqual('hello world')
  })
})
