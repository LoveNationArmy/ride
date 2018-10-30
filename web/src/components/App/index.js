import React, { Component } from 'react'
import ς from '@ride/stigma'
import Login from '../Login'
import Sample from '../Sample'
import state from '../../state'
import logo from './logo.svg'
import './style.css'

class App extends Component {
  state = ς(this, state)

  async componentDidMount () {
    await this.state.queries.getState()
  }

  render () {
    const {
      error,
      loading,
      offers
    } = this.state.data

    return (
      loading ? <div>loading...</div>
      : error ? <pre>{error}</pre>
      : <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>ride</h1>
          </header>
          <div className='App-intro'>
            <Login {...this.state} />
          </div>
          <Sample {...this.state} />
          {
            offers.map((offer, key) => <div key={key}>{offer.id}</div>)
          }
        </div>
    )
  }
}

export default App
