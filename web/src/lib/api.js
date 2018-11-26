type Response = {
  text: Function
}

type JSONResponse = {
  error?: string
}

const handle = async (res: Response) => {
  const body = await res.text()
  try {
    var json: JSONResponse = JSON.parse(body)
  } catch (error) {
    throw new Error(body + `\nCaptured error was: ${error.message}`)
  }
  if (json.error) throw new Error(json.error)
  else return json
}

export default (params = {}) => ({
  ...params,

  url: params.url || window.location.origin,
  fetch: params.fetch || window.fetch.bind(window),

  setUser (user) {
    this.user = user
  },

  mockFetch (data) {
    this.fetch = async (...params) => {
      if (typeof data === 'function') {
        data = await data(...params)
      }
      return Promise.resolve({
        json: () => Promise.resolve(data)
      })
    }
  },

  query (procedure, params = {}, headers = {
    'Accept': 'application/json'
  }) {
    if (this.user) {
      headers.Authorization = `Bearer ${this.user.token}`
    }

    const url = new URL(`${this.url}/queries/${procedure}`)

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return this.fetch(url, {
      method: 'GET',
      headers
    }).then(handle)
  },

  mutation (procedure, body, headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }) {
    if (this.user) {
      headers.Authorization = `Bearer ${this.user.token}`
    }

    if (body) {
      body = JSON.stringify(body)
    }

    return this.fetch(`${this.url}/mutations/${procedure}`, {
      method: 'POST',
      headers,
      body
    }).then(handle)
  }
})
