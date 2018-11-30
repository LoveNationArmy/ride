import React, { Component } from 'react'
import Icon from '../Icon'
import { CSRF_TOKEN, FACEBOOK } from '../../lib/env'
import './style.scss'

export default class Login extends Component {
  receiveMessage = async (e) => {
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

    await queries.login(params.get('code'))

    if (this.callback) {
      try {
        return this.callback()
      } catch (error) {
        console.error('callback error', error.stack, this.callback)
      }
    }
  }

  login = (callback) => {
    const params = new URLSearchParams({
      client_id: FACEBOOK.APP_ID,
      redirect_uri: FACEBOOK.LOGIN_REDIRECT_URI,
      state: CSRF_TOKEN
    })

    window.open(`${FACEBOOK.OAUTH_URI}?${params}`, 'facebook-login')

    this.callback = callback
  }

  componentDidMount () {
    window.addEventListener('message', this.receiveMessage)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage)
  }

  render () {
    const { context, data, mutations } = this.props

    context.login = this

    return !data.user
      ? <button ref='login' className='login-button' onClick={this.login}>
          Enter using Facebook
      </button>
      : <div className='login'>
        <Icon
          className='user-avatar'
          onClick={() => mutations.setUserMenu(!data.ui.showUserMenu)}>
          <img
            src={data.user.avatar}
            alt={`Avatar of ${data.user.name}`}
          />
        </Icon>
      </div>
  }
}
