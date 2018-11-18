import React from 'react'
import Icon from '../Icon'
import './style.scss'

const times = (n, fn) => {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(fn(i))
  }
  return arr
}

export default ({ data }) =>
  <div className='offers-list'>
    {data.offers.map((offer, index) =>
      <div className='offer-item' key={index}>
        <div className='offer-item-time'>
          <div>{offer.date}</div>
          <div className='offer-item-time-text'>
            <img src={offer.user.avatar} className='offer-item-time-icon offer-item-avatar' />
            {offer.time}
          </div>
          <div className='offer-item-places'>
            <span><Icon value='🚀' />{offer.departure}</span>
            <span><Icon value='➩' strong /> <Icon value='⛱' />{offer.arrival}</span>
          </div>
        </div>
        <div className='offer-item-people'>
          <div className='offer-item-vehicle'><Icon value='🚗' />&nbsp;{offer.vehicle}</div>
          <div className='offer-item-people-figures'>
            {(() => {
              let now = (offer.people || Math.random() * 5 | 0)
              return times(offer.capacity, (i) => <div key={i} className={Math.max(now--, 0) ? 'active' : 'inactive'}>웃</div>)
            })()}
          </div>
          <div className='offer-item-price'>{(offer.price || '').toString().replace(/euro/g, '€')}</div>
        </div>
        <div><button><Icon value='👋' /> say&nbsp;hi</button></div>
      </div>
    )}
  </div>
