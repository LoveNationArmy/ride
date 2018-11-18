import React, { Component } from 'react'
import ς from '@ride/stigma'
import Header from '../Header'
import UserMenu from '../UserMenu'
import OfferForm from '../OfferForm'
import OffersList from '../OffersList'
import './style.scss'

class App extends Component {
  constructor (params) {
    super(params)

    this.api = params.api
    this.state = ς(this, params.state)
  }

  render () {
    const { data } = this.state

    if (data.ui.error) {
      return <pre>{data.ui.error}</pre>
    }

    return (
      <div className='app'>
        <Header {...this.state} />
        {data.ui.showUserMenu ? <UserMenu {...this.state} /> : null}
        {data.ui.loading
          ? <div>loading...</div>
          : <div className={data.ui.screen === 'offers' ? '' : 'hidden'}>
            {data.user ? <OfferForm {...this.state} /> : null}
            {<OffersList {...this.state} />}
          </div>
        }
      </div>
    )
  }
}

export default App
