const serverMock = require('nock')
const State = require('../../../../src/lib/state')
const initial = require('../../../../seeders/test.json')

const fixture = {
  props: {
    memory: {
      initial
    },
    http: {
      initial,
      namespace: 'some-namespace',
      url: 'http://foo',
      token: 'some-token'
    }
  },
  data: {
    memory: { some: 'data' },
    http: { other: 'data' }
  }
}

it('should be a constructor', () => {
  const state = new State()
  expect(state).toEqual(expect.any(State))
})

describe('get()', () => {
  const state = new State()

  it('should have the initial data', () => {
    expect(state.get()).toEqual({})
  })

  it('should be mutable', () => {
    state.get().foo = 'bar'
    expect(state.get().foo).toEqual('bar')
  })

  it('should return the current altered state', () => {
    expect(state.get()).toEqual({ foo: 'bar' })
  })
})

describe('set(data)', () => {
  const state = new State()

  it('should replace the data object', () => {
    const fixture = { foo: 'bar' }
    state.set(fixture)
    expect(state.get()).toEqual(fixture)
  })
})

describe('reset()', () => {
  const state = new State({ initial })

  it('should reset the data to the initial state', () => {
    state.get().foo = 'bar'
    expect(state.get()).toEqual({
      foo: 'bar',
      ...initial
    })
    expect(state.reset().get()).toEqual(initial)
  })
})

let postedData

serverMock(fixture.props.http.url)
  .get(`/${fixture.props.http.namespace}`)
  .query({ token: fixture.props.http.token })
  .reply(500)

serverMock(fixture.props.http.url)
  .get(`/${fixture.props.http.namespace}`)
  .query({ token: fixture.props.http.token })
  .reply(200, () => postedData)

serverMock(fixture.props.http.url)
  .post(`/${fixture.props.http.namespace}`, (body) => (postedData = body))
  .query({ token: fixture.props.http.token })
  .reply(200, () => postedData)

const adapters = ['memory', 'http']

adapters.forEach((adapter) => {
  const props = fixture.props[adapter]
  const data = fixture.data[adapter]

  describe(`${adapter} load() with non initialized namespace`, () => {
    const state = new State({ adapter, ...props })

    it('should throw', () => {
      expect(state.get()).toEqual(initial)
      expect(state.load()).rejects.toThrow()
      expect(state.get()).toEqual(initial)
    })
  })

  describe(`${adapter} save()`, () => {
    const state = new State({ adapter, ...props })

    it('should save data and return this', async () => {
      expect(state.get()).toEqual(initial)
      expect(state.set(data)).toEqual(data)
      expect(await state.save()).toBe(state)
      expect(state.get()).toEqual(data)
    })
  })

  describe(`${adapter} load()`, () => {
    const state = new State({ adapter, ...props })

    it('should load data and return this', async () => {
      expect(state.reset().get()).toEqual(initial)
      expect(await state.load()).toBe(state)
      expect(state.get()).toEqual(data)
    })
  })
})
