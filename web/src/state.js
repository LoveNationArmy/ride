export default {
  data: {
    value: 0,
    status: '-',
    response: 'none yet...'
  },
  queries: {
    ping: async ({ data, mutations, update }) => {
      data.response = 'waiting'
      mutations.setStatus('pinging...')
      update()
      return new Promise(resolve => setTimeout(() => {
        data.response = 'pong'
        mutations.setStatus('pinged!')
        resolve()
      }, 3000))
    }
  },
  mutations: {
    setStatus: ({ data }, status) => data.status = status,
    increaseValue: ({ data }) => data.value++,
    decreaseValue: ({ data }) => data.value--
  }
}
