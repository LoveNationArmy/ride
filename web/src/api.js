import state from './state'
import { API_SERVER_URI } from './constants'

const handle = (res) => res.json().then((json) => {
  if (json.error) throw new Error(json.error)
  else return json
})

export default {
  query (procedure, params = {}, headers = {
    'Accept': 'application/json'
  }) {
    if (state.data.user) {
      headers.Authorization = `Bearer ${state.data.user.token}`
    }

    const url = new URL(`${API_SERVER_URI}/queries/${procedure}`)

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url, {
      method: 'GET',
      headers
    }).then(handle)
  },

  mutation (procedure, body, headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }) {
    if (state.data.user) {
      headers.Authorization = `Bearer ${state.data.user.token}`
    }

    if (body) {
      body = JSON.stringify(body)
    }

    return fetch(`${API_SERVER_URI}/mutations/${procedure}`, {
      method: 'POST',
      headers,
      body
    }).then(handle)
  }
}
