const debug = require('debug')('api:routes:queries')
const state = require('../state')

exports.getState = async (req, res) => {
  debug('getState')
  res.json(await state.get())
}
