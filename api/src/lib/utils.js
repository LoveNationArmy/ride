const assert = require('assert')
const slug = require('slug')

exports.generateOfferId = (offer) =>
  ['date', 'time', 'departure', 'arrival', 'vehicle']
    .map(key => {
      assert(offer[key], `Key "${key}" not found in offer`)
      return offer[key]
    })
    .map(s => slug(s, { lower: true }))
    .join('/')
