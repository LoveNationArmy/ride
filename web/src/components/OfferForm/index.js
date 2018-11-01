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
        <label>date <input name='date' type='date' value={offer.date} onChange={this.handleChange} required /></label>
        <label>time <input name='time' type='time' value={offer.time} onChange={this.handleChange} required /></label>
        <label>departure <input name='departure' value={offer.departure} onChange={this.handleChange} placeholder='where from?' required /></label>
        <label>arrival <input name='arrival' value={offer.arrival} onChange={this.handleChange} placeholder='where to?' required /></label>
        <label>vehicle <input name='vehicle' value={offer.vehicle} onChange={this.handleChange} placeholder='i.e seat ibiza XYZ 1234' required /></label>
        <label>웃 <input name='capacity' type='number' value={offer.capacity} onChange={this.handleChange} required /></label>
        <label>price <input name='price' value={offer.price} onChange={this.handleChange} placeholder='i.e 2 euro, gratis' required /></label>
        <button type='submit'>submit offer</button>
      </form>
    )
  }
}
