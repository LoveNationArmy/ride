const debug = require('debug')('api:middleware:auth')
const jwt = require('express-jwt')
const { JWT_SECRET } = process.env

const jwtMiddleware = jwt({ secret: JWT_SECRET })

module.exports = (role) => (req, res, next) => {
  // decrypt jwt
  jwtMiddleware(req, res, (err) => {
    if (err) return next(err)

    // check for role if needed
    if (role && role !== req.user.role) {
      debug('user role mismatch: should be "%s" but is "%s"', role, req.user.role, req.user)
      return res.status(401).json({ error: 'Unauthorized request' })
    }

    // compare current user-agent with the one saved in jwt
    const agent = req.header('user-agent')
    if (req.user.agent !== agent) {
      debug('user agent mismatch: should be "%s" but is "%s"', req.user.agent, agent, req.user)
      return res.status(401).json({ error: 'Unauthorized request' })
    } else {
      delete req.user.agent
      delete req.user.iat
      return next()
    }
  })
}
