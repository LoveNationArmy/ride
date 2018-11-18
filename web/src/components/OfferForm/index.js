import React, { Component } from 'react'
import Icon from '../Icon'
import './style.scss'

const Fieldset = ({ className, children }) => <div className={`fieldset ${className}`}>{children}</div>

let formState = {
  offer: {
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    departure: '',
    arrival: '',
    vehicle: '',
    capacity: 1,
    price: ''
  }
}

const originalFormState = { ...formState }

export default class OfferForm extends Component {
  state = this.getInitialState()

  getInitialState () {
    return formState
  }

  resetFormState = () => this.setState(originalFormState)

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.props.mutations.addOffer(this.state.offer)
    this.resetFormState()
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value // target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    formState = {
      offer: {
        ...this.state.offer,
        [name]: value
      }
    }

    this.setState(formState)
  }

  render () {
    const { offer } = this.state

    return (
      <form className='offer-form' onSubmit={this.handleFormSubmit}>
        <Fieldset>
          <label><Icon value='📆' /><input autoFocus name='date' type='date' value={offer.date} onChange={this.handleInputChange} required /></label>
          <label><input name='time' type='time' value={offer.time} onChange={this.handleInputChange} required /><Icon value='🕘' /></label>
        </Fieldset>
        <Fieldset>
          <label><Icon value='🚀' /><input name='departure' value={offer.departure} onChange={this.handleInputChange} placeholder='departure' required /></label>
          <label><input name='arrival' value={offer.arrival} onChange={this.handleInputChange} placeholder='arrival' required /><Icon value='⛱' /></label>
        </Fieldset>
        <Fieldset>
          <label><Icon value='🚗' /><input name='vehicle' value={offer.vehicle} onChange={this.handleInputChange} placeholder='vehicle' required /></label>
          <label><input name='capacity' type='number' value={offer.capacity} onChange={this.handleInputChange} required /><Icon value='웃' /></label>
        </Fieldset>
        <Fieldset className='offer-form-price'>
          <label><Icon value='🎈' /><span className='per-person'>/웃</span><input name='price' value={offer.price} onChange={this.handleInputChange} placeholder='cost per 웃' required /></label>
          <button type='submit'><Icon value='🚀' /> make offer</button>
        </Fieldset>
      </form>
    )
  }
}
