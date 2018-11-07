const debug = require('debug')('api:routes:mutations')
const utils = require('../lib/utils')

exports.resetState = async (req, res) => {
  debug('resetState')
  await req.state.reset()
  await req.state.save()
  res.sendStatus(200)
}

exports.addOffer = async (req, res) => {
  const id = utils.generateOfferId(req.body)
  const offer = { id, user: req.user, ...req.body }
  debug('addOffer', offer)
  const state = await req.state.get()
  // TODO: initial shape should be seeded instead of built up
  state.offers = state.offers || []
  state.offers.push(offer)
  await req.state.save()
  res.json(offer)
}
