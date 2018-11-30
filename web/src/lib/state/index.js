import queries from './queries'
import mutations from './mutations'
import {
  User,
  Offer
} from './models'

export type LocalState = {|
  user: null | User,
  offers: Offer[],
  ui: Object
|}

export type RemoteState = {|
  offers: Offer[]
|}

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
  queries,
  mutations
})
