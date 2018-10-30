const app = require('../../../src/server')
const request = require('supertest')
const serverMock = require('nock')
const { FB_API_URL } = process.env

describe('login', () => {
  it('responds with user data on success', () => {
    const fixtureUser = {
      id: 123,
      name: 'Some Name',
      avatar: 'https://some.com/picture.jpg'
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

    return request(app)
      .get('/login')
      .query({ code: 'some-code' })
      .expect(200)
      .expect(fixtureUser)
  })

  it('responds with error on failure', () => {
    serverMock(FB_API_URL)
      .get('/oauth/access_token')
      .query(true)
      .reply(403)

    return request(app)
      .get('/login')
      .query({ code: 'some-code' })
      .expect(500)
      .expect(res => expect(res.text).toMatch('Error'))
  })
})
