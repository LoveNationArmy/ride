import React from 'react'
import Icon from '../Icon'
import Logo from '../Logo'
import Login from '../Login'
import './style.scss'

export default (props) =>
  <div className='header'>
    <Logo />
    <div className='header-nav'>
      <Icon
        onClick={() => props.mutations.setScreen('offers')}
        active={props.data.ui.screen === 'offers'}
        value='🚀'
      />
      <Icon
        onClick={() => props.mutations.setScreen('requests')}
        active={props.data.ui.screen === 'requests'}
        value='⛱'
      />
    </div>
    <Login {...props} />
  </div>
