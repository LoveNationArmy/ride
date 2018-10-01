const express = require('express')
const apiRouter = express.Router()

apiRouter.use('/offers', require('./offers'))

apiRouter.use('/ping', function (req, res, next) {
  return res.send('pong').status(200).end()
})

module.exports = apiRouter
