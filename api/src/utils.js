const slug = require('slug')

// 2018-10-15/0930/xania/soygia/hyundai-accent-xnz-3423
exports.generateOfferId = (offer) => [
  offer.date,
  offer.time,
  offer.departure,
  offer.arrival,
  offer.vehicle
].map(s => slug(s, { lower: true })).join('/')
