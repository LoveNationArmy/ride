import React, { Component } from 'react'
import Login from '../Login'
import logo from './logo.svg'
import './style.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>ride</h1>
        </header>
        <div className="App-intro">
          <Login />
        </div>
      </div>
    )
  }
}

export default App
