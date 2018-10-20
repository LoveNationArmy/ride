const debug = require('debug')('api:routes:login')
const querystring = require('querystring')
const fetch = require('node-fetch')
const {
  WEB_CLIENT_ORIGIN,
  FB_API_URL,
  FB_APP_ID,
  FB_APP_SECRET,
} = process.env

module.exports = async (req, res) => {
  const params = querystring.stringify({
    client_id: FB_APP_ID,
    client_secret: FB_APP_SECRET,
    redirect_uri: `${WEB_CLIENT_ORIGIN}/login-redirect.html`,
    code: req.query.code
  })

  debug(req.query.code)

  try {
    const oauthResponse = await fetch(`${FB_API_URL}/oauth/access_token?${params}`)
    const oauth = await oauthResponse.json()
    const userResponse = await fetch(`${FB_API_URL}/me?access_token=${oauth.access_token}`)
    const user = await userResponse.json()
    const pictureResponse = await fetch(`${FB_API_URL}/me/picture?redirect=false&access_token=${oauth.access_token}`)
    const picture = await pictureResponse.json()

    res.json({
      id: user.id,
      fullName: user.name,
      avatarImageUrl: picture.data.url
    })
  } catch (e) {
    debug(e)
    res.status(500).send(e.stack)
  }
}
