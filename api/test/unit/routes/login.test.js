const login = require('../../../src/routes/login')
const clientMock = require('node-mocks-http')
const serverMock = require('nock')
const { FB_API_URL } = process.env

describe('login', () => {
  it('responds with user data on success', async () => {
    const fixtureUser = {
      id: 123,
      fullName: 'Some Name',
      avatarImageUrl: 'https://some.com/picture.jpg'
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
        name: fixtureUser.fullName
      })

    serverMock(FB_API_URL)
      .get('/me/picture')
      .query(true)
      .reply(200, {
        data: {
          url: fixtureUser.avatarImageUrl
        }
      })

    const req = clientMock.createRequest({
      method: 'GET',
      url: '/login',
      query: {
        code: 'some-code'
      }
    })

    const res = clientMock.createResponse()

    await login(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._isJSON()).toBe(true)
    expect(JSON.parse(res._getData())).toEqual(fixtureUser)
  })

  it('responds with error on failure', async () => {
    serverMock(FB_API_URL)
      .get('/oauth/access_token')
      .query(true)
      .reply(403)

    const req = clientMock.createRequest({
      method: 'GET',
      url: '/login'
    })

    const res = clientMock.createResponse()

    await login(req, res)

    expect(res.statusCode).toBe(500)
    expect(res._isJSON()).toBe(false)
    expect(res._getData()).toMatch('Error')
  })
})
