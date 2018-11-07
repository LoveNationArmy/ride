const fetch = require('node-fetch')

module.exports = ({ namespace, url, token }) => ({
  load () {
    return fetch(`${url}/${namespace}?token=${token}`).then(res => res.json())
  },

  save (data) {
    return fetch(`${url}/${namespace}?token=${token}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
  }
})
