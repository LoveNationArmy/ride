const debug = require('debug')('api:routes:offers')
const state = require('../state')

exports.reset = async (req, res) => {
  await state._reset()
  res.json({ success: true })
}

exports.list = (req, res) => {
  res.json(state.data.offers)
}

exports.add = async (req, res) => {
  state.data.offers.push(req.body)
  await state._save()
  res.status(201).json({ success: true })
}

exports.remove = async (req, res) => {
  state.data.offers.splice(req.params.id, 1)
  await state._save()
  res.status(200).json({ success: true })
}
