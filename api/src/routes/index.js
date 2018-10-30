const debug = require('debug')('api:routes')
const AsyncRouter = require('express-async-router').AsyncRouter
const { json } = require('body-parser')
const { auth } = require('../middleware')
const mutations = exports.mutations = require('./mutations')
const queries = exports.queries = require('./queries')

const router = exports.router = new AsyncRouter()

// queries
router.get('/queries/getState', queries.getState)
router.get('/queries/login', queries.login)

// mutations
router.post('/mutations/resetState', auth('admin'), mutations.resetState)
router.post('/mutations/addOffer', auth(), json(), mutations.addOffer)

// error handling
router.use((error, req, res, next) => {
  debug(error)
  res.status(500).json({ error: error.stack })
})
