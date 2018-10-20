const debug = require('debug')('api:state')
const fetch = require('node-fetch')
const {
  DB_TOKEN,
  DB_URL,
  DB_NAME
} = process.env

class State {
  constructor () {
    this._load().catch(() => this._reset())
  }

  _load () {
    debug('loading ...')
    return fetch(`${DB_URL}/${DB_NAME}/load?token=${DB_TOKEN}`)
      .then(res => res.json())
      .then(data => {
        debug('loaded', data)
        return (this.data = data)
      })
  }

  _save () {
    debug('saving ...')
    return fetch(`${DB_URL}/${DB_NAME}/save?token=${DB_TOKEN}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(this.data)
    }).then(res => res.json())
      .then(data => {
        debug('saved', data)
        return (this.data = data)
      })
  }

  _reset () {
    debug('resetting ...')
    return fetch(`${DB_URL}/${DB_NAME}/reset?token=${DB_TOKEN}`, {
      method: 'POST',
    }).then(res => res.json())
      .then(data => {
        debug('resetted', data)
        return (this.data = data)
      })
  }
}

module.exports = new State()
