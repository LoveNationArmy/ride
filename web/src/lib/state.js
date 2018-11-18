export const withLoading = (fn) => async (state, ...params) => {
  state.data.ui.loading = true
  state.update()
  await fn(state, ...params)
  state.data.ui.loading = false
}

export default (initialState = {}) => ({
  data: {
    user: 'user' in initialState ? initialState.user : localStorage.user ? JSON.parse(localStorage.user) : null,
    offers: [],
    ui: {
      error: null,
      loading: false,
      screen: 'screen' in initialState ? initialState.screen : localStorage.screen || 'offers',
      showUserMenu: false
    }
  },
  queries: {
    login: withLoading(async ({ data, api }, code) => {
      data.user = await api.query('login', { code })
      api.setUser(data.user)
      localStorage.user = JSON.stringify(data.user)
    }),
    logout: ({ data, api }) => {
      data.user = null
      api.setUser(null)
      delete localStorage.user
    },
    getState: withLoading(async ({ data, api }) => {
      Object.assign(data, await api.query('getState'))
    })
  },
  mutations: {
    addOffer: async ({ data, api }, offer) => {
      data.offers.push(await api.mutation('addOffer', offer))
    },
    setScreen: ({ data }, screen) => {
      data.ui.screen = screen
      localStorage.screen = screen
    },
    setUserMenu: ({ data }, visibility) => {
      if (Date.now() - setUserMenuFiredOn < 500) {
        return
      }
      setUserMenuFiredOn = Date.now()
      data.ui.showUserMenu = visibility
    }
  }
})

let setUserMenuFiredOn = Date.now()
