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
      loading
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
            <Login />
          </div>
          <Sample {...this.state} />
        </div>
    )
  }
}

export default App
