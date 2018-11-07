const serverMock = require('nock')
const http = require('../../../../../src/lib/state/adapters/http')

const fixture = {
  url: 'http://some.url',
  namespaces: ['foo', 'bar'],
  data: {
    foo: { some: 'data' },
    bar: { other: 'data' }
  }
}

fixture.namespaces.forEach((namespace) => {
  serverMock(fixture.url)
    .get(`/${namespace}`)
    .query({ token: 'valid' })
    .times(2)
    .reply(200, () => fixture.data[namespace])

  serverMock(fixture.url)
    .get(`/${namespace}`)
    .query({ token: 'invalid' })
    .reply(500)

  serverMock(fixture.url)
    .post(`/${namespace}`)
    .query({ token: 'invalid' })
    .reply(500)

  serverMock(fixture.url)
    .post(`/${namespace}`, (body) => (fixture.data[namespace] = body))
    .query({ token: 'valid' })
    .reply(200, () => fixture.data[namespace])
})

fixture.namespaces.forEach((namespace) => {
  describe(`namespace: ${namespace}`, () => {
    const valid = http({ namespace, url: fixture.url, token: 'valid' })
    const invalid = http({ namespace, url: fixture.url, token: 'invalid' })
    const differentData = { different: 'data' }

    it(`load() with a valid token`, async () => {
      expect(await valid.load()).toEqual(fixture.data[namespace])
    })

    it(`load() with a invalid token`, async () => {
      expect(invalid.load()).rejects.toThrow('invalid json')
    })

    it(`save() different data with an invalid token`, () => {
      expect(invalid.save(differentData)).rejects.toThrow('invalid json')
    })

    it(`save() different data with a valid token`, async () => {
      expect(await valid.save(differentData)).toEqual(differentData)
    })

    it(`load() with a valid token has retained different data`, async () => {
      expect(await valid.load()).toEqual(differentData)
    })
  })
})

const moreData = { more: 'data' }

serverMock(fixture.url)
  .get('/more')
  .query({ token: 'valid' })
  .reply(500)

serverMock(fixture.url)
  .post('/more', moreData)
  .query({ token: 'valid' })
  .reply(200, moreData)

serverMock(fixture.url)
  .get('/more')
  .query({ token: 'valid' })
  .reply(200, moreData)

describe('new namespace', () => {
  const adapter = http({ namespace: 'more', url: fixture.url, token: 'valid' })

  it('load() throws', () => {
    expect(adapter.load()).rejects.toThrow('invalid json')
  })

  it('save() works', async () => {
    expect(await adapter.save(moreData)).toEqual(moreData)
  })

  it('load() now works', async () => {
    expect(await adapter.load()).toEqual(moreData)
  })
})
