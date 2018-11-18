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
  offers: [
    {
      date: '2018-10-15',
      time: '09:30',
      departure: 'Χανιά',
      arrival: 'Σούγια',
      vehicle: 'Hyundai Accent XNZ 3423'
    },
    {
      date: '2018-10-15',
      time: '12:30',
      departure: 'Χανιά',
      arrival: 'Παλαιόχωρα',
      vehicle: 'Fiat Punto XNA 5657'
    },
    {
      date: '2018-10-18',
      time: '18:30',
      departure: 'Σούγια',
      arrival: 'Χανιά',
      vehicle: 'Hyundai Accent XNZ 3423'
    }
  ]
}

fixture.user.token = jwt.sign(fixture.user, JWT_SECRET)
fixture.admin.token = jwt.sign(fixture.admin, JWT_SECRET)

const expected = {}

expected.user = {
  id: fixture.user.id,
  name: fixture.user.name,
  avatar: fixture.user.avatar
}

expected.offers = [
  {
    id: '2018-10-15/0930/xania/soygia/hyundai-accent-xnz-3423',
    user: expected.user,
    ...fixture.offers[0]
  },
  {
    id: '2018-10-15/1230/xania/palaioxwra/fiat-punto-xna-5657',
    user: expected.user,
    ...fixture.offers[1]
  },
  {
    id: '2018-10-18/1830/soygia/xania/hyundai-accent-xnz-3423',
    user: expected.user,
    ...fixture.offers[2]
  }
]

const server = createServer()

beforeAll((done) => {
  request(server)
    .post('/api/mutations/resetState')
    .set('User-Agent', fixture.admin.agent)
    .set('Authorization', `Bearer ${fixture.admin.token}`)
    .expect(200, done)
})

describe('as a guest user when i try to add an offer', () => {
  it('should forbid it', () => {
    return request(server)
      .post('/api/mutations/addOffer')
      .send(fixture.offers[0])
      .expect(401)
  })
})

describe('as a logged in user i can add offers', () => {
  it('should add offer to the offers list', () => {
    return request(server)
      .post('/api/mutations/addOffer')
      .set('User-Agent', fixture.user.agent)
      .set('Authorization', `Bearer ${fixture.user.token}`)
      .send(fixture.offers[0])
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expected.offers[0])
      })
  })

  it('should be added in the offers list', () => {
    return request(server)
      .get('/api/queries/getState')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          offers: [
            expected.offers[0]
          ]
        })
      })
  })

  it('adds offer from fixture index 1', () => {
    return request(server)
      .post('/api/mutations/addOffer')
      .set('User-Agent', fixture.user.agent)
      .set('Authorization', `Bearer ${fixture.user.token}`)
      .send(fixture.offers[1])
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expected.offers[1])
      })
  })

  it('should be added in the offers list', () => {
    return request(server)
      .get('/api/queries/getState')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          offers: [
            expected.offers[0],
            expected.offers[1]
          ]
        })
      })
  })

  it('adds offer from fixture index 2', () => {
    return request(server)
      .post('/api/mutations/addOffer')
      .set('User-Agent', fixture.user.agent)
      .set('Authorization', `Bearer ${fixture.user.token}`)
      .send(fixture.offers[2])
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expected.offers[2])
      })
  })

  it('should be added in the offers list', () => {
    return request(server)
      .get('/api/queries/getState')
      .expect(200)
      .expect((res) => {
        expect(res.body.offers).toEqual(expected.offers)
      })
  })
})
