import React, { Component } from 'react'
import ς from '@ride/stigma'
import Header from '../Header'
import OfferForm from '../OfferForm'
import OffersList from '../OffersList'
import state from '../../state'
import './style.css'

class App extends Component {
  state = ς(this, state)

  render () {
    const { data } = this.state

    return (
      data.loading ? <div>loading...</div>
      : data.error ? <pre>{data.error}</pre>
      : <div className='app'>
          <Header {...this.state} />
          {data.user ? <OfferForm {...this.state} /> : null}
          <OffersList {...this.state} />
        </div>
    )
  }
}

export default App
