const debug = require('debug')('api:bootstrap')
const assert = require('assert')
const env = process.env

debug('bootstrapping application')

debug('ensuring environment variables')
;[
  'NODE_ENV',
  'SANITY',
  'WEB_CLIENT_ORIGIN',
  'DB_TOKEN',
  'DB_URL',
  'DB_NAME',
  'FB_API_URL',
  'FB_APP_ID',
  'FB_APP_SECRET',
].forEach(key => assert(key in env, `Environment variable missing: "${key}"
Environment "${env.NODE_ENV}" has not been configured properly.
Please contact a team member for assistance.`))
