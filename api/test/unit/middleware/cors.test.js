const cors = require('../../../src/middleware/cors')
const clientMock = require('node-mocks-http')

describe('cors', () => {
  it('allows environment defined origin', (done) => {
    process.env.WEB_CLIENT_ORIGIN = 'https://valid.com'
    const req = clientMock.createRequest({
      method: 'GET',
      headers: { origin: 'https://valid.com' }
    })
    const res = clientMock.createResponse()
    const next = () => {
      expect(res.getHeader('Access-Control-Allow-Origin')).toEqual('https://valid.com')
      done()
    }
    cors(req, res, next)
  })

  it('does not allow different than environment defined origin', (done) => {
    process.env.WEB_CLIENT_ORIGIN = 'https://valid.com'
    const req = clientMock.createRequest({
      method: 'GET',
      headers: { origin: 'https://invalid.com' }
    })
    const res = clientMock.createResponse()
    const next = () => {
      expect(res.getHeader('Access-Control-Allow-Origin')).toBeUndefined()
      done()
    }
    cors(req, res, next)
  })
})
