// https://github.com/ilearnio/module-alias
const { expect } = require('chai')

function requireUncached(module){
  delete require.cache[require.resolve(module)]
  return require(module)
}

const Offer = requireUncached('../models/Offer')

xdescribe('Offer model', () => {
  // it('should save offers', done => {
  //   glitch.save('test', state).then(res => {
  //     expect(res).to.deep.equal(state)
  //   }).then(done).catch(done)
  // })
  it('should get the list of offers', done => {
    Offer.findAll().then(res => {
      expect(res).to.deep.equal([])
    }).then(done).catch(done)
  })
})
