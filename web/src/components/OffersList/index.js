import React from 'react'
import './style.css'

export default ({ data }) =>
  <div className='offers-list'>
    {data.offers.map((offer, index) =>
      <div className='offer-item' key={index}>
        <div className='offer-item-date'>{offer.date}</div>
        <div className='offer-item-time'>{offer.time}</div>
        <div className='offer-item-departure'>{offer.departure}</div>
        <div className='offer-item-arrival'>{offer.arrival}</div>
        <div className='offer-item-capacity'>{offer.capacity}</div>
        <button>join</button>
      </div>
    )}
  </div>
