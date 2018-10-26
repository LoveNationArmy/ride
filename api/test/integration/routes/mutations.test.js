const app = require('../../../src/server')
const request = require('supertest')

const fixtures = {
  offers: [
    {
      date: '2018-10-15',
      time: '09:30',
      departure: 'Χανιά',
      arrival: 'Σούγια',
      vehicle: 'Hyundai Accent XNZ 3423'
    },
    {
      date: '2018-10-15',
      time: '12:30',
      departure: 'Χανιά',
      arrival: 'Παλαιόχωρα',
      vehicle: 'Fiat Punto XNA 5657'
    },
    {
      date: '2018-10-18',
      time: '18:30',
      departure: 'Σούγια',
      arrival: 'Χανιά',
      vehicle: 'Hyundai Accent XNZ 3423'
    },
  ]
}

const expected = {
  offers: [
    {
      id: '2018-10-15/0930/xania/soygia/hyundai-accent-xnz-3423',
      ...fixtures.offers[0]
    },
    {
      id: '2018-10-15/1230/xania/palaioxwra/fiat-punto-xna-5657',
      ...fixtures.offers[1]
    },
    {
      id: '2018-10-18/1830/soygia/xania/hyundai-accent-xnz-3423',
      ...fixtures.offers[2]
    },
  ]
}

describe('resetState', () => {
  it('resets state to initial shape', () => {
    return request(app)
      .post('/mutations/resetState')
      .expect(200)
      .expect({ success: true })
  })
})

describe('addOffer', () => {
  it('adds offer from fixture index 0', () => {
    return request(app)
      .post('/mutations/addOffer')
      .send(fixtures.offers[0])
      .expect(200)
      .expect({
        success: true,
        offer: expected.offers[0]
      })
  })

  it('should be added in the offers list', () => {
    return request(app)
      .get('/queries/getState')
      .expect(200)
      .expect({
        offers: [
          expected.offers[0]
        ]
      })
  })

  it('adds offer from fixture index 1', () => {
    return request(app)
      .post('/mutations/addOffer')
      .send(fixtures.offers[1])
      .expect(200)
      .expect({
        success: true,
        offer: expected.offers[1]
      })
  })

  it('should be added in the offers list', () => {
    return request(app)
      .get('/queries/getState')
      .expect(200)
      .expect({
        offers: [
          expected.offers[0],
          expected.offers[1]
        ]
      })
  })

  it('adds offer from fixture index 2', () => {
    return request(app)
      .post('/mutations/addOffer')
      .send(fixtures.offers[2])
      .expect(200)
      .expect({
        success: true,
        offer: expected.offers[2]
      })
  })

  it('should be added in the offers list', () => {
    return request(app)
      .get('/queries/getState')
      .expect(200)
      .expect({
        offers: expected.offers
      })
  })
})
