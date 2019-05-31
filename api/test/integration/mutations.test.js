const request = require('supertest')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../src/lib/env')()

const createServer = () => {
  jest.resetModules()
  return require('../../src/server')
}

const fixture = {
  user: {
    agent: 'Firefox',
    id: '123user',
    name: 'User Name',
    avatar: 'user.jpg'
  },
  admin: {
    agent: 'Chrome',
    role: 'admin',
    id: '456admin',
    name: 'Admin User',
    avatar: 'admin.jpg'
  },
  offer: {
    date: '2018-10-15',
    time: '09:30',
    departure: 'Χανιά',
    arrival: 'Σούγια',
    vehicle: 'Hyundai Accent XNZ 3423'
  }
}

fixture.user.token = jwt.sign(fixture.user, JWT_SECRET)
fixture.admin.token = jwt.sign(fixture.admin, JWT_SECRET)

const expected = {}

expected.user = {
  id: fixture.user.id,
  name: fixture.user.name,
  avatar: fixture.user.avatar
}

expected.offer = {
  id: '2018-10-15/0930/xania/soygia/hyundai-accent-xnz-3423',
  user: expected.user,
  status: 'created',
  joined: [],
  ...fixture.offer
}

describe('/mutations/resetState', () => {
  const server = createServer()

  it('should forbid when user is NOT authorized (guest)', () => {
    return request(server)
      .post('/api/mutations/resetState')
      .expect(401)
  })

  it('should forbid when user is NOT admin', () => {
    return request(server)
      .post('/api/mutations/resetState')
      .set('User-Agent', fixture.user.agent)
      .set('Authorization', `Bearer ${fixture.user.token}`)
      .expect(403)
  })

  it('should reset state when user IS admin', () => {
    return request(server)
      .post('/api/mutations/resetState')
      .set('User-Agent', fixture.admin.agent)
      .set('Authorization', `Bearer ${fixture.admin.token}`)
      .expect(200)
  })
})

describe('/mutations/addOffer', () => {
  const server = createServer()

  it('should forbid when NOT authorized', () => {
    return request(server)
      .post('/api/mutations/addOffer')
      .send(fixture.offer)
      .expect(401)
  })

  it('should respond with offer object when IS authorized', () => {
    return request(server)
      .post('/api/mutations/addOffer')
      .set('User-Agent', fixture.user.agent)
      .set('Authorization', `Bearer ${fixture.user.token}`)
      .send(fixture.offer)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expected.offer)
      })
  })
})
