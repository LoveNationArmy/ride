const debug = require('debug')('api:lib:env')
const { resolve } = require('path')
const dotenv = require('dotenv')
const assert = require('assert')

const assertKeys = (keys) => {
  keys.forEach(key => assert(key in process.env, `Environment key missing: "${key}"
  Environment "${process.env.NODE_ENV}" has not been configured properly.
  Please contact a team member for assistance.`))
}

module.exports = () => {
  assert(process.env.NODE_ENV, 'Failed to setup environment. "NODE_ENV" is not defined.')

  debug('loading keys for environment %s', process.env.NODE_ENV)

  dotenv.config({
    path: resolve(process.cwd(), `.env.${process.env.NODE_ENV.toLowerCase()}`)
  })

  debug('ensuring keys')

  assertKeys([
    'NODE_ENV',
    'SANITY',
    'DEBUG',
    'WEB_CLIENT_ORIGIN',
    'JWT_SECRET',
    'DB_ADAPTER',
    'DB_SEEDERS',
    'DB_URL',
    'DB_TOKEN',
    'FB_API_URL',
    'FB_APP_ID',
    'FB_APP_SECRET',
    'CODECOV_TOKEN'
  ])

  return process.env
}
