const cors = require('cors')

module.exports = cors({
  origin: (origin, cb) => cb(null, process.env.WEB_CLIENT_ORIGIN.split(',').includes(origin))
})
