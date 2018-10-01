const querystring = require('querystring')
const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const app = express()

app.use(cors()) // TODO: change to web client origin

app.get('/', (req, res) => res.send('Hello from Express!'))

app.get('/login', async (req, res) => {
  const params = querystring.stringify({
    client_id: '566342073799546',
    client_secret: 'd17f5f0419c2f0bd639b5832ff840633',
    redirect_uri: 'https://localhost:3000/login-redirect.html',
    code: req.query.code
  })

  try {
    const oauthResponse = await fetch(`https://graph.facebook.com/v3.1/oauth/access_token?${params}`)
    const oauth = await oauthResponse.json()
    const userResponse = await fetch(`https://graph.facebook.com/v3.1/me?access_token=${oauth.access_token}`)
    const user = await userResponse.json()
    const pictureResponse = await fetch(`https://graph.facebook.com/v3.1/me/picture?redirect=false&access_token=${oauth.access_token}`)
    const picture = await pictureResponse.json()

    res.json({
      fullName: user.name,
      avatarImageUrl: picture.data.url
    })
  } catch (e) {
    console.error(e)
    res.status(500).send(e.stack)
  }
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))
