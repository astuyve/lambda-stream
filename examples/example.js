const pipeline = require("util").promisify(require("stream").pipeline);
const zlib = require('zlib');
const { Readable } = require('stream');
const { streamifyResponse } = require('lambda-stream')


const handler = async (event, responseStream, _context) => {
    // As an example, convert event to a readable stream.
    const requestStream = Readable.from(Buffer.from(JSON.stringify('hiiii')));
    
    await pipeline(requestStream, zlib.createGzip(), responseStream);
}

module.exports.gzip = streamifyResponse(handler)
