const debug = require('debug')('api:routes:mutations')
const state = require('../state')
const utils = require('../utils')

exports.resetState = async (req, res) => {
  debug('resetState')
  await state.reset()
  res.sendStatus(200)
}

exports.addOffer = async (req, res) => {
  const id = utils.generateOfferId(req.body)
  const offer = { id, user: req.user, ...req.body }
  debug('addOffer', offer)
  await state.get().offers.push(offer)
  await state.save()
  res.json(offer)
}
