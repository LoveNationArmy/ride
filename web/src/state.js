import {
  API_SERVER_URI
} from './constants'

export const withLoading = (fn) => async (state) => {
  state.data.loading = true
  state.update()
  await fn(state)
  state.data.loading = false
}

export default {
  data: {
    error: null,
    loading: false
  },
  queries: {
    getState: withLoading(async ({ data }) => {
      const response = await fetch(`${API_SERVER_URI}/queries/getState`)
      const json = await response.json()
      Object.assign(data, json)
    })
  },
  mutations: {
    setStatus: ({ data }, status) => data.status = status,
    increaseValue: ({ data }) => data.value++,
    decreaseValue: ({ data }) => data.value--
  }
}
