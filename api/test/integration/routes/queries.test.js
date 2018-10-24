const app = require('../../../src/server')
const request = require('supertest')

describe('resetState', () => {
  it('resets state to initial shape', () => {
    return request(app)
      .post('/mutations/resetState')
      .expect(200)
      .expect({ success: true })
  })
})

describe('getState', () => {
  it('should return a state with the default shape', () => {
    return request(app)
      .get('/queries/getState')
      .expect(200)
      .expect({
        offers: []
      })
  })
})
