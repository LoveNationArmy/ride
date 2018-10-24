const slug = require('slug')

// 2018-10-15-09-30/xania/soygia/hyundai-accent-xnz-3423
exports.generateOfferId = (offer) => [
  offer.date,
  offer.departure,
  offer.arrival,
  offer.vehicle
].map(s => slug(s, { lower: true })).join('/')
