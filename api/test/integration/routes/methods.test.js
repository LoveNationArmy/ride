const app = require('../../../src/server')
const request = require('supertest')

const fixtures = {
  offers: [
    { title: 'a' },
    { title: 'b' },
    { title: 'c' },
  ]
}

describe('reset', () => {
  it('resets data to initial state', () => {
    return request(app)
      .post('/offers/reset')
      .expect(200)
      .expect({ success: true })
  })
})

describe('listoffers', () => {
  it('responds with empty offers list', () => {
    return request(app)
      .get('/offers')
      .expect(200)
      .expect([])
  })
})

describe('addEntry', () => {
  it('adds entry a', () => {
    return request(app)
      .post('/offers')
      .send(fixtures.offers[0])
      .expect(201)
      .expect({ success: true })
  })

  it('should be added in the offers list', () => {
    return request(app)
      .get('/offers')
      .expect(200)
      .expect(fixtures.offers.slice(0,1))
  })

  it('adds entry b', () => {
    return request(app)
      .post('/offers')
      .send(fixtures.offers[1])
      .expect(201)
      .expect({ success: true })
  })

  it('should be added in the offers list', () => {
    return request(app)
      .get('/offers')
      .expect(200)
      .expect(fixtures.offers.slice(0,2))
  })

  it('adds entry c', () => {
    return request(app)
      .post('/offers')
      .send(fixtures.offers[2])
      .expect(201)
      .expect({ success: true })
  })

  it('should be added in the offers list', () => {
    return request(app)
      .get('/offers')
      .expect(200)
      .expect(fixtures.offers)
  })
})

describe('removeEntry', () => {
  it('removes entry b', () => {
    return request(app)
      .del('/offers/1')
      .expect(200)
      .expect({ success: true })
  })

  it('should be removed from the offers list', () => {
    return request(app)
      .get('/offers')
      .expect(200)
      .expect([ fixtures.offers[0], fixtures.offers[2] ])
  })

  it('removes entry a', () => {
    return request(app)
      .del('/offers/0')
      .expect(200)
      .expect({ success: true })
  })

  it('should be removed from the offers list', () => {
    return request(app)
      .get('/offers')
      .expect(200)
      .expect([ fixtures.offers[2] ])
  })
})
