const debug = require('debug')('api:routes')
const AsyncRouter = require('express-async-router').AsyncRouter
const { json } = require('body-parser')
const routes = exports
const router = routes.router = new AsyncRouter()

routes.login = require('./login')
routes.queries = require('./queries')
routes.mutations = require('./mutations')

router.get('/login', routes.login)

router.get('/queries/getState', routes.queries.getState)

router.post('/mutations/resetState', routes.mutations.resetState)
router.post('/mutations/addOffer', json(), routes.mutations.addOffer)

router.use((error, req, res, next) => {
  debug(error)
  res.status(500).json({
    error: error.stack
  })
})
