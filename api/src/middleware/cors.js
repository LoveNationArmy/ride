const cors = require('cors')

module.exports = cors({
  origin: (origin, cb) => cb(null, origin === process.env.WEB_CLIENT_ORIGIN)
})
