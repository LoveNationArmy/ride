const debug = require('debug')('api:routes:methods')
const state = require('../state')

exports.reset = async (req, res) => {
  await state._reset()
  res.json({ success: true })
}

exports.listEntries = (req, res) => {
  res.json(state.data.entries)
}

exports.addEntry = async (req, res) => {
  state.data.entries.push(req.body)
  await state._save()
  res.status(201).json({ success: true })
}
