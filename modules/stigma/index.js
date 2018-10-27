module.exports = (context, state) => {
  state.update = () => context.setState(context.state)
  state.queries = effects(context, state.queries)
  state.mutations = effects(context, state.mutations)
  return state
}

const effects = (context, object) => {
  const newObject = {}
  for (const method in object) {
    newObject[method] = updates(context, object[method])
  }
  return newObject
}

const updates = (context, fn) => async (...params) => {
  await fn(context.state, ...params)
  context.state.update()
}
