require('./bootstrap')

const debug = require('debug')('api:server')
const express = require('express')
const { json } = require('body-parser')
const middleware = require('./middleware')
const routes = require('./routes')
const app = module.exports = express()
const env = process.env

// middleware
app.use(middleware.cors)

// routes
app.get('/login', routes.login)
app.post('/methods/reset', routes.methods.reset)
app.get('/methods/listEntries', routes.methods.listEntries)
app.post('/methods/addEntry', json(), routes.methods.addEntry)

// start server when running from the cli (using `node server.js`)
// istanbul ignore if because we can't instrument coverage for cli usage(?)
if (require.main === module) {
  debug('starting ...')
  const server = app.listen(3001, () => {
    const address = server.address()
    debug(`listening on ${address.address} ${address.port}`)
  })
}
