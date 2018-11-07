// TODO: test various State configurations

class State {}

jest.setMock('../../../src/lib/state', State)

const state = require('../../../src/middleware/state')

it('should attach state to the request object', (done) => {
  const req = {}
  state(req, {}, () => {
    expect(req.state).toEqual(expect.any(State))
    done()
  })
})
