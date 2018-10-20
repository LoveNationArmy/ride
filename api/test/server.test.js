const app = require('../src/server')

describe('app', () => {
  it('is an express server', () => {
    expect(app).toHaveProperty('handle')
  })
})
