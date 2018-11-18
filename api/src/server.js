require('./lib/env')()
const express = require('express')
const routes = require('./routes')
const middleware = require('./middleware')
const app = module.exports = express()

// state
app.state = middleware.state.instance

// middleware
app.use(middleware.cors)

// router
app.use('/api', routes.router)
