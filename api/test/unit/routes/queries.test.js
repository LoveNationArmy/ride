const queries = require('../../../src/routes/queries')
const clientMock = require('node-mocks-http')
const serverMock = require('nock')
const jwt = require('jsonwebtoken')
const { FB_API_URL, JWT_SECRET } = process.env

describe('getState', () => {
  it('should return the state data', async () => {
    const mockState = { foo: 'bar' }

    const mockReq = clientMock.createRequest({
      method: 'GET',
      url: '/queries/getState'
    })

    mockReq.state = {
      load: () => {},
      get: () => mockState
    }

    const mockRes = clientMock.createResponse()

    await queries.getState(mockReq, mockRes)

    expect(mockRes.statusCode).toEqual(200)
    expect(mockRes._isJSON()).toEqual(true)
    expect(JSON.parse(mockRes._getData())).toEqual(mockState)
  })
})

describe('login', () => {
  it('responds with user data on success', async () => {
    const fixtureUser = {
      agent: 'Firefox',
      id: 123,
      name: 'Some Name',
      avatar: 'https://some.com/picture.jpg'
    }

    const expectedUser = {
      id: fixtureUser.id,
      name: fixtureUser.name,
      avatar: fixtureUser.avatar,
      token: jwt.sign(fixtureUser, JWT_SECRET)
    }

    serverMock(FB_API_URL)
      .get('/oauth/access_token')
      .query(query => query.code === 'some-code')
      .reply(200, {
        access_token: 'some-token'
      })

    serverMock(FB_API_URL)
      .get('/me')
      .query(query => query.access_token === 'some-token')
      .reply(200, {
        id: fixtureUser.id,
        name: fixtureUser.name
      })

    serverMock(FB_API_URL)
      .get('/me/picture')
      .query(true)
      .reply(200, {
        data: {
          url: fixtureUser.avatar
        }
      })

    const mockReq = clientMock.createRequest({
      method: 'GET',
      url: '/queries/login',
      headers: {
        'user-agent': fixtureUser.agent
      },
      query: {
        code: 'some-code'
      }
    })

    const mockRes = clientMock.createResponse()

    await queries.login(mockReq, mockRes)

    expect(mockRes.statusCode).toEqual(200)
    expect(mockRes._isJSON()).toEqual(true)
    expect(JSON.parse(mockRes._getData())).toEqual(expectedUser)
  })

  it('responds with error on failure', async () => {
    serverMock(FB_API_URL)
      .get('/oauth/access_token')
      .query(true)
      .reply(403)

    const mockReq = clientMock.createRequest({
      method: 'GET',
      url: '/queries/login'
    })

    const mockRes = clientMock.createResponse()

    await expect(queries.login(mockReq, mockRes)).rejects.toThrow()
  })
})
