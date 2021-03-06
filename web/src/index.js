import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './components/App'
import api from './lib/api'
import state from './lib/state'
import * as env from './lib/env'
import './index.scss'

const app = ReactDOM.render(
  <App
    api={api({ url: env.API_SERVER_URI,
      fetch: (...params) => {
        return new Promise(resolve => {
          const beginTime = Date.now()
          window.fetch(...params).then((res) => {
            const diffTime = 450 - (Date.now() - beginTime)
            if (diffTime > 0) {
              setTimeout(resolve, diffTime, res)
            } else {
              resolve(res)
            }
          })
        })
      } })}
    state={state()}
  />,
  document.getElementById('root')
)

app.api.setUser(app.state.data.user)
app.state.queries.getState()

serviceWorker.register()
