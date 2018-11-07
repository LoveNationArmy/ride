const env = require('../../../src/lib/env')
const old = { ...process.env }

afterEach(() => (process.env = { ...old }))

it('should throw when missing NODE_ENV', () => {
  delete process.env.NODE_ENV
  expect(env).toThrow('NODE_ENV')
})

it('should not throw when environment is setup properly', () => {
  expect(env).not.toThrow()
})

it('should setup the right environment', () => {
  expect(env().NODE_ENV).toEqual('test')
  expect(env().SANITY).toEqual('sane')
})
