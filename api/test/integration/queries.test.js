const request = require('supertest')
const serverMock = require('nock')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, FB_API_URL } = require('../../src/lib/env')()

const createServer = () => {
  jest.resetModules()
  return require('../../src/server')
}

describe('/queries/getState', () => {
  it('should return the state', () => {
    const server = createServer()
    return request(server)
      .get('/queries/getState')
      .expect(200)
      .expect({})
  })
})

describe('/queries/login', () => {
  const server = createServer()

  it('responds with user data and valid token containing user data on success', () => {
    const fixtureUser = {
      agent: 'some-agent',
      id: 'some-id',
      name: 'some name',
      avatar: 'https://some.com/picture.jpg'
    }

    const expectedUser = {
      token: jwt.sign(fixtureUser, JWT_SECRET),
      id: fixtureUser.id,
      name: fixtureUser.name,
      avatar: fixtureUser.avatar
    }

    serverMock(FB_API_URL)
      .get('/oauth/access_token')
      .query((query) => query.code === 'some-code')
      .reply(200, {
        access_token: 'some-token'
      })

    serverMock(FB_API_URL)
      .get('/me')
      .query((query) => query.access_token === 'some-token')
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

    return request(server)
      .get('/queries/login')
      .set('User-Agent', fixtureUser.agent)
      .query({ code: 'some-code' })
      .expect(200)
      .expect(expectedUser)
      .expect((res) => {
        const decoded = jwt.verify(res.body.token, JWT_SECRET)
        expect(decoded).toEqual(jwt.verify(expectedUser.token, JWT_SECRET))
        delete decoded.iat // removing iat should make the object identical to the fixture
        expect(decoded).toEqual(fixtureUser)
      })
  })

  it('responds with vague login error on failure', () => {
    serverMock(FB_API_URL)
      .get('/oauth/access_token')
      .query(true)
      .reply(403)

    return request(server)
      .get('/queries/login')
      .query({ code: 'some-code' })
      .expect(500)
      .expect((res) => expect(res.body.error).toMatch('Login failed'))
  })
})
