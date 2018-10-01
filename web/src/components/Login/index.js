import React, { Component } from 'react'
import state from '../../state'
import {
  CSRF_TOKEN,
  FACEBOOK
} from '../../constants'

export default class Login extends Component {
  receiveMessage = async (e) => {
    const params = new URLSearchParams(e.data)
    console.log('Facebook login callback params:', params)

    if (params.get('state') !== CSRF_TOKEN) {
      throw new Error('Cross-site forgery attempt')
    }

    if (params.get('error')) {
      // TODO: display error to the user
      throw new Error('Facebook login failed')
    }

    // user has signed in, ask backend for access token
    const loginResponse = await fetch(`http://localhost:3001/login?code=${params.get('code')}`)
    const profile = await loginResponse.json()

    state.user.profile = profile
    this.forceUpdate()
  }

  login = () => {
    const params = new URLSearchParams({
      client_id: FACEBOOK.APP_ID,
      redirect_uri: FACEBOOK.LOGIN_REDIRECT_URI,
      state: CSRF_TOKEN
    })

    window.open(`${FACEBOOK.OAUTH_URI}?${params}`, 'facebook-login')
  }

  logout = () => {
    delete state.user.profile
    this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('message', this.receiveMessage)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage)
  }

  render () {
    return !state.user.profile
      ? <button onClick={this.login}>
          Enter using Facebook
        </button>
      : <div>
          Welcome, {state.user.profile.fullName}<br />
          <img src={state.user.profile.avatarImageUrl} /><br />
          <button onClick={this.logout}>
            Logout
          </button>
        </div>
  }
}
