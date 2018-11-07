const use = []

jest.setMock('express', () => ({
  use: (handler) => use.push(handler)
}))

jest.setMock('../../src/middleware', {
  cors: 'cors'
})

jest.setMock('../../src/routes', {
  router: 'router'
})

require('../../src/server')

it('should have registered global handlers with the right order', () => {
  expect(use[0]).toEqual('cors')
  expect(use[1]).toEqual('router')
})
