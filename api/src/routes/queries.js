const debug = require('debug')('api:routes:queries')
const querystring = require('querystring')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const {
  NODE_ENV,
  JWT_SECRET,
  FB_API_URL,
  FB_APP_ID,
  FB_APP_SECRET
} = process.env

let {
  WEB_CLIENT_ORIGIN,
} = process.env

exports.getState = async (req, res) => {
  debug('getState')
  await req.state.load()
  res.json(await req.state.get())
}

exports.login = async (req, res) => {
  debug('login', req.query.code)

  if (NODE_ENV !== 'production') {
    WEB_CLIENT_ORIGIN = req.header('referer').slice(0, -1)
  }

  const params = querystring.stringify({
    client_id: FB_APP_ID,
    client_secret: FB_APP_SECRET,
    redirect_uri: `${WEB_CLIENT_ORIGIN}/login-redirect.html`,
    code: req.query.code
  })

  try {
    const oauthResponse = await fetch(`${FB_API_URL}/oauth/access_token?${params}`)
    const oauth = await oauthResponse.json()
    const userResponse = await fetch(`${FB_API_URL}/me?access_token=${oauth.access_token}`)
    const user = await userResponse.json()
    const pictureResponse = await fetch(`${FB_API_URL}/me/picture?redirect=false&access_token=${oauth.access_token}`)
    const picture = await pictureResponse.json()

    console.log(oauthResponse.text())
    // encode user data and user agent to a jwt so that we can verify
    // incoming requests as originating from the facebook logged in user
    // with a relatively good degree of confidence
    const token = jwt.sign({
      agent: req.header('user-agent'),
      id: user.id,
      name: user.name,
      avatar: picture.data.url
    }, JWT_SECRET)

    res.json({
      token,
      id: user.id,
      name: user.name,
      avatar: picture.data.url
    })
  } catch (error) {
    console.error(error.stack)
    throw new Error('Login failed unexpectedly')
  }
}
