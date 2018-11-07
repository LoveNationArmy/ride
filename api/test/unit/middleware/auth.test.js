const eventEmitter = require('events').EventEmitter
const jwt = require('jsonwebtoken')
const clientMock = require('node-mocks-http')
const auth = require('../../../src/middleware/auth')
const { JWT_SECRET } = process.env

describe('auth()', () => {
  const middleware = auth()

  const fixtureUser = {
    agent: 'user-agent',
    id: 'user-id',
    name: 'user-name',
    avatar: 'user-avatar'
  }

  const expectedUser = {
    id: fixtureUser.id,
    name: fixtureUser.name,
    avatar: fixtureUser.avatar
  }

  it('allows user with valid json token and matching agent', (done) => {
    const token = jwt.sign(fixtureUser, JWT_SECRET)
    const mockReq = clientMock.createRequest({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': fixtureUser.agent
      }
    })
    const mockRes = clientMock.createResponse()
    const next = () => {
      expect(mockReq.user).toEqual(expectedUser)
      done()
    }

    middleware(mockReq, mockRes, next)
  })

  it('rejects user with invalid json token', (done) => {
    const mockReq = clientMock.createRequest({
      method: 'GET',
      headers: {
        'Authorization': `Bearer invalid`,
        'User-Agent': fixtureUser.agent
      }
    })
    const mockRes = clientMock.createResponse()
    const next = (err) => {
      expect(err.name).toEqual('UnauthorizedError')
      done()
    }

    middleware(mockReq, mockRes, next)
  })

  it('rejects user with valid json token and non-matching agent', (done) => {
    const token = jwt.sign(fixtureUser, JWT_SECRET)
    const mockReq = clientMock.createRequest({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'non-matching'
      }
    })
    const mockRes = clientMock.createResponse({ eventEmitter })

    middleware(mockReq, mockRes)

    mockRes.on('end', () => {
      expect(mockRes.statusCode).toEqual(401)
      expect(mockRes._isJSON()).toEqual(true)
      expect(JSON.parse(mockRes._getData()).error).toMatch('Unauthorized')
      done()
    })
  })
})

describe('auth(role)', () => {
  const middleware = auth('admin')

  const fixtureUser = {
    agent: 'user-agent',
    id: 'user-id',
    name: 'user-name',
    avatar: 'user-avatar'
  }

  const fixtureAdmin = {
    agent: 'admin-agent',
    role: 'admin',
    id: 'admin-id',
    name: 'admin-name',
    avatar: 'admin-avatar'
  }

  const expectedAdmin = {
    id: fixtureAdmin.id,
    role: fixtureAdmin.role,
    name: fixtureAdmin.name,
    avatar: fixtureAdmin.avatar
  }

  it('allows user with matching role', (done) => {
    const token = jwt.sign(fixtureAdmin, JWT_SECRET)
    const mockReq = clientMock.createRequest({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': fixtureAdmin.agent
      }
    })
    const mockRes = clientMock.createResponse()
    const next = () => {
      expect(mockReq.user).toEqual(expectedAdmin)
      done()
    }

    middleware(mockReq, mockRes, next)
  })

  it('rejects user with non-matching role', (done) => {
    const token = jwt.sign(fixtureUser, JWT_SECRET)
    const mockReq = clientMock.createRequest({
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': fixtureUser.agent
      }
    })
    const mockRes = clientMock.createResponse({ eventEmitter })

    middleware(mockReq, mockRes)

    mockRes.on('end', () => {
      expect(mockRes.statusCode).toEqual(403)
      expect(mockRes._isJSON()).toEqual(true)
      expect(JSON.parse(mockRes._getData()).error).toMatch('Forbidden')
      done()
    })
  })
})
