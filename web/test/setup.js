import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

const { resolve } = require('path')

require('dotenv').config({ path: resolve(process.cwd(), '.env.test') })
