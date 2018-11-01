import React, { Component } from 'react'
import './style.css'

export default class OfferForm extends Component {
  state = this.getInitialState()

  getInitialState () {
    return {
      offer: {
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        departure: 'Χανιά',
        arrival: '',
        vehicle: '',
        capacity: 1,
        price: ''
      }
    }
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      offer: {
        ...this.state.offer,
        [name]: value
      }
    })
  }

  submitOffer = (e) => {
    const { mutations } = this.props

    e.preventDefault()

    mutations.addOffer(this.state.offer)

    this.setState(this.getInitialState())
  }

  render () {
    const { offer } = this.state

    return (
      <form className='offer-form' onSubmit={this.submitOffer}>
        <input name='date' type='date' value={offer.date} onChange={this.handleChange} required />
        <input name='time' type='time' value={offer.time} onChange={this.handleChange} required />
        <input name='departure' value={offer.departure} onChange={this.handleChange} placeholder='Departure from' required />
        <input name='arrival' value={offer.arrival} onChange={this.handleChange} placeholder='Arrive to' required />
        <input name='vehicle' value={offer.vehicle} onChange={this.handleChange} placeholder='Vehicle' required />
        <div style={{ position: 'relative' }} className='offer-form-capacity'>
          <input style={{ paddingLeft: '20px' }} name='capacity' type='number' value={offer.capacity} onChange={this.handleChange} required />
          <span style={{ position: 'absolute', left: '4px', top: '-1px' }}>웃</span>
        </div>
        <input name='price' value={offer.price} onChange={this.handleChange} placeholder='Price (per person)' required />
        <button type='submit'>submit offer</button>
      </form>
    )
  }
}
