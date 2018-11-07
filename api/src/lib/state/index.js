const debug = require('debug')('api:lib:state')

module.exports = class State {
  constructor (props = {}) {
    this.namespace = props.namespace = props.namespace || 'default'
    this.adapter = require(`./adapters/${props.adapter || 'memory'}`)(props)
    this.initial = props.initial || {}
    this.reset()
  }

  get () {
    return this.data
  }

  set (data) {
    return (this.data = data)
  }

  reset () {
    this.data = JSON.parse(JSON.stringify(this.initial))
    return this
  }

  async load () {
    debug('loading ...')
    this.set(await this.adapter.load())
    debug('loaded', this.get())
    return this
  }

  async save () {
    debug('saving', this.get())
    await this.adapter.save(this.get())
    debug('saved')
    return this
  }
}
