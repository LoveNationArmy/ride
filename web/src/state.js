import api from './api'

export const withLoading = (fn) => async (state, ...params) => {
  state.data.loading = true
  state.update()
  await fn(state, ...params)
  state.data.loading = false
}

export default {
  data: {
    user: localStorage.user ? JSON.parse(localStorage.user) : null,
    error: null,
    loading: false,
    offers: []
  },
  queries: {
    login: withLoading(async ({ data }, code) => {
      data.user = await api.query('login', { code })
      localStorage.user = JSON.stringify(data.user)
    }),
    logout: ({ data }) => {
      data.user = null
      delete localStorage.user
    },
    getState: withLoading(async ({ data }) => {
      Object.assign(data, await api.query('getState'))
    })
  },
  mutations: {
    addOffer: async ({ data }, offer = {
      date: '2018-10-15',
      time: '09:30',
      departure: 'Χανιά',
      arrival: 'Σούγια',
      vehicle: 'Hyundai Accent XNZ 3423'
    }) => {
      data.offers.push(await api.mutation('addOffer', offer))
    }
  }
}
