import { withLoading, withUser } from './utils'
import {
  Offer,
  OfferPost
} from './models'

export default {
  addOffer: async ({ data, api }, offer: OfferPost) => {
    data.offers.push(await api.mutation('addOffer', offer))
  },
  endOffer: async ({ data, api }, offer: Offer) => {
    offer.status = 'ended'
  },
  sayHi: withLoading(withUser(async ({ data, update, api }, offer: Offer) => {
    if (data.user.id === offer.user.id) {
      data.ui.error = 'Conflict: cannot sayHi on own offer'
      update()
      setTimeout(() => {
        data.ui.error = null
        update()
      }, 3000)
      return
    }

    Object.assign(offer, await api.mutation('sayHi', offer))
  })),
  cancelHi: withLoading(async ({ data, api }, offer: Offer) => {
    Object.assign(offer, await api.mutation('cancelHi', offer))
  }),
  setScreen: ({ data }, screen: string) => {
    data.ui.screen = screen
    localStorage.screen = screen
  },
  setUserMenu: ({ data }, visibility: boolean) => {
    if (Date.now() - setUserMenuFiredOn < 500) {
      return
    }
    setUserMenuFiredOn = Date.now()
    data.ui.showUserMenu = visibility
  }
}

let setUserMenuFiredOn = Date.now()
