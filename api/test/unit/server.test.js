const use = []

jest.setMock('express', () => ({
  use: (...params) => use.push(params)
}))

jest.setMock('../../src/middleware', {
  cors: 'cors',
  auth: 'auth',
  state: 'state'
})

jest.setMock('../../src/routes', {
  router: 'router'
})

require('../../src/server')

it('should have registered global handlers with the right order', () => {
  expect(use[0]).toEqual(['cors'])
  expect(use[1]).toEqual(['/api', 'router'])
})
