/*!
 * Constants
 */

export const CSRF_TOKEN = (Math.random() * 10e9).toString(36)

export const FACEBOOK = {
  APP_ID: '566342073799546',
  OAUTH_URI: 'https://www.facebook.com/v3.1/dialog/oauth',
  LOGIN_REDIRECT_URI: `${window.location.origin}/login-redirect.html`
}
