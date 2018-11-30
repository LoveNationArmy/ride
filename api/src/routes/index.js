const debug = require('debug')('api:routes')
const AsyncRouter = require('express-async-router').AsyncRouter
const { json } = require('body-parser')
const { auth, state } = require('../middleware')

const router = exports.router = new AsyncRouter()
const queries = exports.queries = require('./queries')
const mutations = exports.mutations = require('./mutations')

// queries
router.get('/queries/getState', state, queries.getState)
router.get('/queries/login', queries.login)

// mutations
router.post('/mutations/resetState', auth('admin'), state, mutations.resetState)
router.post('/mutations/addOffer', auth(), json(), state, mutations.addOffer)
router.post('/mutations/sayHi', auth(), json(), state, mutations.sayHi)
router.post('/mutations/cancelHi', auth(), json(), state, mutations.cancelHi)

// error handling
router.use((error, req, res, next) => {
  debug('handled error', error)
  // TODO: env!=development only show message, not stacktrace
  res.status(error.status || 500).json({ error: error.stack })
})
