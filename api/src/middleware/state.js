const State = require('../lib/state')

const state = new State()

module.exports = (req, res, next) => {
  req.state = state
  next()
}
