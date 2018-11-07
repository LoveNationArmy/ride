const env = require('../../../src/lib/env')()

it('sets up environment variables are set correctly', () => {
  expect(env.NODE_ENV).toBe('test')
  expect(env.SANITY).toBe('sane')
  expect(env.DB_NAME).toBe('test')
})
