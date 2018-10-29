require('./bootstrap')

const debug = require('debug')('api:server')
const express = require('express')
const routes = require('./routes')
const middleware = require('./middleware')
const app = module.exports = express()
const env = process.env

// middleware
app.use(middleware.cors)

// router
app.use(routes.router)

// start server when running from the cli (using `node server.js`)
// istanbul ignore if because we can't instrument coverage for cli usage(?)
if (require.main === module) {
  debug('starting ...')
  const server = app.listen(3001, () => {
    const address = server.address()
    debug(`listening on ${address.address} ${address.port}`)
  })
}