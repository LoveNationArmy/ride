import { withLoading } from './utils'

export default {
  login: withLoading(async ({ data, api }, code) => {
    data.user = await api.query('login', { code })
    api.setUser(data.user)
    localStorage.user = JSON.stringify(data.user)
  }),
  logout: ({ data, api }) => {
    data.user = null
    api.setUser(data.user)
    delete localStorage.user
  },
  getState: withLoading(async ({ data, api }) => {
    Object.assign(data, await api.query('getState'))
  })
}
