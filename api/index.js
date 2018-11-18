const debug = require('debug')('api:entry')
const app = require('./src/server')

// start server when running from the cli (using `node server.js`)
// istanbul ignore if because we can't instrument coverage for cli usage(?)
debug('starting ...')
app.listen(3001, () => {
  debug('listening')
})
