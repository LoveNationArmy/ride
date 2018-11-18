import React, { Component } from 'react'
import Icon from '../Icon'
import { CSRF_TOKEN, FACEBOOK } from '../../lib/env'
import './style.scss'

export default class Login extends Component {
  receiveMessage = (e) => {
    const { queries } = this.props

    if (e.data.source !== 'login') return

    const params = new URLSearchParams(e.data.payload)

    if (params.get('state') !== CSRF_TOKEN) {
      throw new Error('Cross-site forgery attempt')
    }

    if (params.get('error')) {
      // TODO: display error to the user
      throw new Error('Facebook login failed')
    }

    queries.login(params.get('code'))
  }

  login = () => {
    const params = new URLSearchParams({
      client_id: FACEBOOK.APP_ID,
      redirect_uri: FACEBOOK.LOGIN_REDIRECT_URI,
      state: CSRF_TOKEN
    })

    window.open(`${FACEBOOK.OAUTH_URI}?${params}`, 'facebook-login')
  }

  componentDidMount () {
    window.addEventListener('message', this.receiveMessage)
    window.addEventListener('mousedown', this.windowTapHandler)
    window.addEventListener('touchstart', this.windowTapHandler)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage)
    window.removeEventListener('mousedown', this.windowTapHandler)
    window.removeEventListener('touchstart', this.windowTapHandler)
  }

  render () {
    const { data, mutations } = this.props

    return !data.user
      ? <button className='login-button' onClick={this.login}>
          Enter using Facebook
      </button>
      : <div className='login'>
        <Icon onClick={() => mutations.setUserMenu(!data.ui.showUserMenu)}>
          <img
            src={data.user.avatar}
            alt={`Avatar of ${data.user.name}`}
          />
        </Icon>
      </div>
  }
}
