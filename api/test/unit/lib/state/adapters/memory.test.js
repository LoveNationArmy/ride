const memory = require('../../../../../src/lib/state/adapters/memory')

const fixture = {
  url: 'http://some.url',
  namespaces: ['foo', 'bar'],
  data: {
    foo: { some: 'data' },
    bar: { other: 'data' }
  }
}

fixture.namespaces.forEach((namespace) => {
  describe(`namespace: ${namespace}`, () => {
    const adapter = memory({ namespace })
    const data = fixture.data[namespace]

    it('load() should throw', () => {
      expect(() => adapter.load()).toThrow()
    })

    it('save() should save data', () => {
      expect(adapter.save(data)).toEqual(data)
    })

    it('load() should load data', () => {
      expect(adapter.load()).toEqual(data)
    })
  })
})
