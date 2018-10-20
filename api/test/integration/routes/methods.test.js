const app = require('../../../src/server')
const request = require('supertest')

describe('reset', () => {
  it('resets data to initial state', () => {
    return request(app)
      .post('/methods/reset')
      .expect(200)
      .expect({ success: true })
  })
})

describe('listEntries', () => {
  it('responds with entries data', () => {
    return request(app)
      .get('/methods/listEntries')
      .expect(200)
      .expect([])
  })
})

describe('addEntry', () => {
  it('adds an entry with given data', () => {
    const entryData = {
      title: 'foo'
    }
    return request(app)
      .post('/methods/addEntry')
      .send(entryData)
      .expect(201)
      .expect({ success: true })
  })
})
