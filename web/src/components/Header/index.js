import React from 'react'
import Logo from '../Logo'
import Login from '../Login'
import './style.css'

export default (props) =>
  <div className='header'>
    <Logo />
    <Login {...props} />
  </div>
