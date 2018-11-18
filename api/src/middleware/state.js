const State = require('../lib/state')
const env = require('../lib/env')()

const state = new State({
  namespace: env.NODE_ENV,
  adapter: env.DB_ADAPTER,
  url: env.DB_URL,
  token: env.DB_TOKEN
})

module.exports = (req, res, next) => {
  req.state = state
  next()
}
