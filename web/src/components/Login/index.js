import React, { Component } from 'react'
import {
  CSRF_TOKEN,
  FACEBOOK
} from '../../constants'

export default class Login extends Component {
  receiveMessage = async (e) => {
    // this is a hacky way to avoid reading on react dev tools messages
    if (typeof e.data !== 'string') return

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
    const fbUser = await loginResponse.json()

    localStorage.user = JSON.stringify({
      id: fbUser.id,
      fullName: fbUser.fullName,
      avatarImageUrl: fbUser.avatarImageUrl
    })

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
    delete localStorage.user
    this.forceUpdate()
  }

  componentDidMount () {
    window.addEventListener('message', this.receiveMessage)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage)
  }

  render () {
    let user = localStorage.user
    if (user) user = JSON.parse(localStorage.user)
    return !user
      ? <button onClick={this.login}>
          Enter using Facebook
        </button>
      : <div>
          Welcome, {user.fullName}<br />
          <img src={user.avatarImageUrl} alt={`Avatar of ${user.fullName}`} /><br />
          <button onClick={this.logout}>
            Logout
          </button>
        </div>
  }
}
