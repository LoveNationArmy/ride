// https://github.com/ilearnio/module-alias
const { expect } = require('chai')

function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}

const GlitchAdapter = requireUncached('../adapters/glitch')

describe('Glitch adapter', () => {
  const state = { some: 'data' }
  let glitch
  beforeEach(() => {
    glitch = new GlitchAdapter()
  })
  it('should save a JSON object in the ns', done => {
    glitch.save('test', state).then(res => {
      expect(res).to.deep.equal(state)
    }).then(done).catch(done)
  })
  it('should get the JSON document for a ns', done => {
    glitch.find('test').then(res => {
      expect(res).to.deep.equal(state)
    }).then(done).catch(done)
  })
  it('should reset a ns', done => {
    glitch.reset('test').then(res => {
      expect(res).to.deep.equal({})
    }).then(done).catch(done)
  })
})
