const utils = require('../../../src/lib/utils')

describe('generateOfferId(offer)', () => {
  it('should generate an offer id from an offer object', () => {
    const fixtureOffer = {
      date: '2018-10-15',
      time: '09:30',
      departure: 'Chania',
      arrival: 'Barcelona',
      vehicle: 'Purple Unicorn'
    }

    const expectedOfferId = '2018-10-15/0930/chania/barcelona/purple-unicorn'

    const offerId = utils.generateOfferId(fixtureOffer)

    expect(offerId).toEqual(expectedOfferId)
  })

  it('should throw when a key is empty in the offer object', () => {
    const fixtureOffer = {
      date: '2018-10-15',
      time: '09:30',
      departure: '',
      arrival: 'Barcelona',
      vehicle: 'Purple Unicorn'
    }

    expect(() => utils.generateOfferId(fixtureOffer)).toThrow('departure')
  })

  it('should throw when a key is missing from the offer object', () => {
    const fixtureOffer = {
      date: '2018-10-15',
      time: '09:30',
      departure: 'Chania',
      arrival: 'Barcelona'
    }

    expect(() => utils.generateOfferId(fixtureOffer)).toThrow('vehicle')
  })
})
