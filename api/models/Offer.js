// TODO make adapter configurable in model
const GlitchAdapter = require('../adapters/glitch')
// TODO wrap asyn init logic
const db = new GlitchAdapter()

const Offer = {
  findAll () {
    return db.find('test').then(doc => {
      console.log('DOC', doc)
      return doc.offers
    })
  }
}

module.exports = Offer
