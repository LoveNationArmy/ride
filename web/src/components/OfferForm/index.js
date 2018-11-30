import React, { Component } from 'react'
import Icon from '../Icon'
import './style.scss'

const Fieldset = ({ dual, className, children }) =>
  <div className={[
    'fieldset',
    className,
    dual && 'dual'
  ].filter(Boolean).join(' ')}><div className='fieldset-inner'>{children}</div></div>

const Label = ({ children }) =>
  <div className='label'><label>{children}</label></div>

let formState = {
  offer: {
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    departure: '',
    arrival: '',
    vehicle: '',
    capacity: '1',
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
          <Label>
            <Icon value='🚗' active={offer.vehicle.includes('car')} onClick={() => this.setState({ offer: { ...offer, vehicle: 'car ' } })} />
            <Icon value='🛵' active={offer.vehicle.includes('bike')} onClick={() => this.setState({ offer: { ...offer, vehicle: 'bike ' } })} />
            <Icon value='🚐' active={offer.vehicle.includes('van')} onClick={() => this.setState({ offer: { ...offer, vehicle: 'van ' } })} />
            <Icon value='🚌' active={offer.vehicle.includes('bus')} onClick={() => this.setState({ offer: { ...offer, vehicle: 'bus ' } })} />
            <Icon value='🚵' active={offer.vehicle.includes('bicycle')} onClick={() => this.setState({ offer: { ...offer, vehicle: 'bicycle ' } })} />
            <Icon value='⛵' active={offer.vehicle.includes('boat')} onClick={() => this.setState({ offer: { ...offer, vehicle: 'boat ' } })} />
            <input name='vehicle' value={offer.vehicle} onChange={this.handleInputChange} placeholder='vehicle' required />
            <input name='capacity' type='number' value={offer.capacity} onChange={this.handleInputChange} required /><Icon value='웃' />
          </Label>
        </Fieldset>

        <Fieldset dual>
          <Label><Icon value='📆' /><input autoFocus name='date' type='date' value={offer.date} onChange={this.handleInputChange} required /></Label>
          <Label><input name='time' type='time' value={offer.time} onChange={this.handleInputChange} required /><Icon value='🕘' /></Label>
        </Fieldset>

        <Fieldset dual>
          <Label><Icon value='🚀' /><input name='departure' value={offer.departure} onChange={this.handleInputChange} placeholder='everywhere' /></Label>
          <Label><input name='arrival' value={offer.arrival} onChange={this.handleInputChange} placeholder='anywhere' /><Icon value='⛱' /></Label>
        </Fieldset>

        <Fieldset className='offer-form-price'>
          <Label>
            <Icon value='🎈' /><input name='price' value={offer.price} onChange={this.handleInputChange} placeholder={'what\'s about'} required />
            <button type='submit'><Icon value='🚀' /> make offer</button>
          </Label>
        </Fieldset>
      </form>
    )
  }
}
