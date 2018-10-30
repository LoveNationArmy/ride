import React, { Component } from 'react'
import {
  CSRF_TOKEN,
  FACEBOOK
} from '../../constants'

export default class Login extends Component {
  receiveMessage = (e) => {
    const { queries } = this.props

    if (e.data.source !== 'login') return

    const params = new URLSearchParams(e.data.payload)
    console.log('Facebook login callback params:', params)

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
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.receiveMessage)
  }

  render () {
    const { data, queries } = this.props

    return !data.user
      ? <button onClick={this.login}>
          Enter using Facebook
        </button>
      : <div>
          Welcome, {data.user.name}<br />
          <img src={data.user.avatar} alt={`Avatar of ${data.user.name}`} /><br />
          <button onClick={queries.logout}>
            Logout
          </button>
        </div>
  }
}
