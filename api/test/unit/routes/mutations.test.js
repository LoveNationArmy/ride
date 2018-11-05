const mutations = require('../../../src/routes/mutations')
const clientMock = require('node-mocks-http')

describe('resetState', () => {
  it('should reset the state data', async () => {
    const mockReq = clientMock.createRequest({
      method: 'POST',
      url: '/mutations/resetState'
    })

    mockReq.state = {
      reset: () => {}
    }

    const mockRes = clientMock.createResponse()

    await mutations.resetState(mockReq, mockRes)

    expect(mockRes.statusCode).toEqual(200)
  })
})

describe('addOffer', () => {
  it('should add an offer to the offers list', async () => {
    const fixture = {
      user: {
        id: '123'
      },
      offer: {
        date: '2018-10-15',
        time: '09:30',
        departure: 'Χανιά',
        arrival: 'Σούγια',
        vehicle: 'Hyundai Accent XNZ 3423'
      }
    }

    const mockReq = clientMock.createRequest({
      method: 'POST',
      url: '/mutations/addOffer',
      body: fixture.offer
    })

    mockReq.user = fixture.user

    const mockState = {
      offers: []
    }

    mockReq.state = {
      get: () => mockState,
      save: () => {}
    }

    const mockRes = clientMock.createResponse()

    await mutations.addOffer(mockReq, mockRes)

    expect(mockRes.statusCode).toEqual(200)
    expect(mockState.offers.length).toEqual(1)
    expect(mockState.offers[0].date).toEqual(fixture.offer.date)
  })
})
