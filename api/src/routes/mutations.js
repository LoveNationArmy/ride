const debug = require('debug')('api:routes:mutations')
const state = require('../state')
const utils = require('../utils')

exports.resetState = async (req, res) => {
  debug('resetState')
  await state.reset()
  res.json({ success: true })
}

exports.addOffer = async (req, res) => {
  const id = utils.generateOfferId(req.body)
  const offer = { id, ...req.body }
  debug('addOffer', offer)
  await state.get().offers.push(offer)
  await state.save()
  res.json({ success: true, offer })
}
