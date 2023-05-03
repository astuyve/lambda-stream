const pipeline = require('util').promisify(require('stream').pipeline)
const { Readable } = require('stream')
const { streamifyResponse } = require('lambda-stream')

const handler = async (event, responseStream, _context) => {
  // As an example, convert event to a readable stream.
  requestStream = Readable.from(Buffer.from(JSON.stringify({ hello: 'world' })))

  await pipeline(requestStream, responseStream)
}

module.exports.gzip = streamifyResponse(handler)
