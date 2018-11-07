const state = {}

module.exports = ({ namespace }) => ({
  load () {
    if (!(namespace in state)) {
      throw new Error(`State data not initialized for namespace ${namespace}`)
    }
    return state[namespace]
  },

  save (data) {
    return (state[namespace] = data)
  }
})
