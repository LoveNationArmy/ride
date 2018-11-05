const debug = require('debug')('api:routes')
const AsyncRouter = require('express-async-router').AsyncRouter
const { json } = require('body-parser')
const { auth, state } = require('../middleware')
const mutations = exports.mutations = require('./mutations')
const queries = exports.queries = require('./queries')

const router = exports.router = new AsyncRouter()

// queries
router.get('/queries/getState', state, queries.getState)
router.get('/queries/login', queries.login)

// mutations
router.post('/mutations/resetState', auth('admin'), state, mutations.resetState)
router.post('/mutations/addOffer', auth(), json(), state, mutations.addOffer)

// error handling
router.use((error, req, res, next) => {
  debug('handled error', error)
  res.status(500).json({ error: error.stack })
})
