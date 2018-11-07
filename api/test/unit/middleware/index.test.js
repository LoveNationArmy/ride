const middleware = require('../../../src/middleware')

it('should export all middleware', () => {
  const expected = ['cors', 'auth', 'state']

  expected.forEach((m) => expect(middleware).toHaveProperty(m))
})
