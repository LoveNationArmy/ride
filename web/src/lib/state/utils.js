export const withLoading = (fn) => async (state, ...params) => {
  state.data.ui.loading = true
  state.update()
  await fn(state, ...params)
  state.data.ui.loading = false
}

export const withUser = (fn) => async (state, ...params) => {
  if (state.data.user) {
    await fn(state, ...params)
  } else {
    state.context.login.login(async () => {
      await fn(state, ...params)
    })
  }
}
