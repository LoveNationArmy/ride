const state = require('../state')

module.exports = (req, res, next) => {
  req.state = state
  next()
}
