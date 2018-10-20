const { resolve } = require('path')

require('dotenv').config({ path: resolve(process.cwd(), '.env.test') })
