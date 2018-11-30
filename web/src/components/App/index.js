import React, { Component } from 'react'
import ς from '@ride/stigma'
import * as models from '../../lib/state/models'
import Header from '../Header'
import UserMenu from '../UserMenu'
import OfferForm from '../OfferForm'
import OffersList from '../OffersList'
import './style.scss'

export type Data = {|
  user: null | models.UserLoggedIn,
  offers: models.Offer[],
  ui: Object
|}

export type AppState = {|
  data: Data,
  queries: {},
  mutations: {},
  update: Function,
  api: {},
  context: Object
|}

class App extends Component {
  state: AppState

  constructor (params) {
    super(params)

    this.api = params.api
    this.state = ς(this, params.state)
  }

  setState (object: AppState) {
    super.setState(object)
  }

  render () {
    const { data } = this.state

    return (
      <div className='app'>
        <Header {...this.state} />
        {data.ui.showUserMenu ? <UserMenu {...this.state} /> : null}
        {data.ui.error ? <div className='loading'><span>{data.ui.error}</span></div> : null}
        {data.ui.loading ? <div className='loading'><span>loading...</span></div> : null}
        <div className={data.ui.screen === 'offers' ? '' : 'hidden'}>
          {data.user ? <OfferForm {...this.state} /> : null}
          {<OffersList {...this.state} />}
        </div>
      </div>
    )
  }
}

export default App
