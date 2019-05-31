const clientMock = require('node-mocks-http')

const routerPaths = {
  get: [],
  post: [],
  use: []
}

jest.setMock('express-async-router', {
  AsyncRouter: class MockAsyncRouter {
    get (...params) { routerPaths.get.push(params) }
    post (...params) { routerPaths.post.push(params) }
    use (...params) { routerPaths.use.push(params) }
  }
})

jest.setMock('../../../src/middleware', {
  auth: (role = 'user') => `auth ${role}`,
  state: 'state'
})

jest.setMock('body-parser', {
  json: () => 'json'
})

const { queries, mutations } = require('../../../src/routes')

const expectedPaths = {
  get: [
    ['/queries/getState', 'state', queries.getState],
    ['/queries/login', queries.login]
  ],
  post: [
    ['/mutations/resetState', 'auth admin', 'state', mutations.resetState],
    ['/mutations/addOffer', 'auth user', 'json', 'state', mutations.addOffer],
    ['/mutations/sayHi', 'auth user', 'json', 'state', mutations.sayHi],
    ['/mutations/cancelHi', 'auth user', 'json', 'state', mutations.cancelHi],
    ['/mutations/handleJoinRequest', 'auth user', 'json', 'state', mutations.handleJoinRequest]
  ]
}

it('should have registered paths with their middleware', () => {
  expect(routerPaths.get).toEqual(expectedPaths.get)
  expect(routerPaths.post).toEqual(expectedPaths.post)
})

it('should have registered the error handler', () => {
  expect(routerPaths.use.length).toEqual(1)
  expect(routerPaths.use[0][0].length).toEqual(4)
})

describe('error handler', () => {
  it('should respond with error stack', () => {
    const mockReq = clientMock.createRequest()
    const mockRes = clientMock.createResponse()
    const fixtureError = { stack: 'foo' }
    const expectedResponse = { error: fixtureError.stack }

    routerPaths.use[0][0](fixtureError, mockReq, mockRes)

    expect(mockRes.statusCode).toEqual(500)
    expect(mockRes._isJSON()).toEqual(true)
    expect(JSON.parse(mockRes._getData())).toEqual(expectedResponse)
  })
})
