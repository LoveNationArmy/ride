const debug = require('debug')('api:lib:state:adapters:http')
let fetch = require('node-fetch')

if (fetch.default) fetch = fetch.default

module.exports = ({ namespace, url, token }) => ({
  load () {
    return fetch(`${url}/${namespace}?token=${token}`).then(res => res.json()).catch(error => {
      void error
      debug(error)
      debug('Possible Solution: check if the State server is running')
      throw new Error('load fetch error')
    })
  },

  save (data) {
    return fetch(`${url}/${namespace}?token=${token}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json()).catch(error => {
      void error
      throw new Error('save fetch error')
    })
  }
})
