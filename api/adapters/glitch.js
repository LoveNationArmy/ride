const rp = require('request-promise-native')
// TODO allow to configure URL and token in adapter
const { GLITCH_TOKEN, GLITCH_URL } = process.env

class GlitchAdapter {
  find (namespace) {
    return rp({
      method: 'GET',
      uri: `${GLITCH_URL}/${namespace}/load`,
      qs: {
        token: GLITCH_TOKEN
      },
      json: true
    })
  }
  save (namespace, payload) {
    return rp({
      method: 'PUT',
      uri: `${GLITCH_URL}/${namespace}/save`,
      body: payload,
      qs: {
        token: GLITCH_TOKEN
      },
      json: true
    })
  }
  reset (namespace) {
    return rp({
      method: 'POST',
      uri: `${GLITCH_URL}/${namespace}/reset`,
      qs: {
        token: GLITCH_TOKEN
      },
      json: true
    })
  }
}

module.exports = GlitchAdapter
