import React from 'react'
import Icon from '../Icon'
import IconButton from '../IconButton'
import { Offer, OfferJoinedUser } from '../../lib/state/models'
import relativeTime from '../../lib/relative-time'
import './style.scss'

const times = (n, fn) => {
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(fn(i, arr))
  }
  return arr
}

export default ({ data, mutations }) =>
  <div className='offers-list'>{
    data.offers
      .filter((offer: Offer) => offer.status !== 'ended')
      .map((offer: Offer, index) => {
        let actions

        const sayHi = <IconButton value='👋' onClick={() => mutations.sayHi(offer)}>say&nbsp;hi</IconButton>
        const endOffer = <IconButton value='🏁' onClick={() => mutations.endOffer(offer)}>end</IconButton>
        const cancelHi = <div className='offer-item-pending'><span>pending...</span>
          <IconButton value='❌' onClick={() => mutations.cancelHi(offer)}>cancel</IconButton>
        </div>
        const viewOffer = <IconButton value='🔦' onClick={() => mutations.setScreen('offer', offer.id)}>view</IconButton>

        const pending = offer.joined
          .filter((user: OfferJoinedUser) => user.status === 'pending')
          .map((user: OfferJoinedUser, index) => (
            <div className='offer-item-joined' key={index}>
              <div className='offer-item-joined-user'>
                <img className='offer-item-joined-avatar' src={user.avatar} />
                <p>{user.name}<br />says hi <Icon value='👋' /></p>
              </div>
              <div className='offer-item-joined-actions'>
                <IconButton value='✅' onClick={() => mutations.handleJoinRequest('accepted', offer, user)}>accept</IconButton>
                <IconButton value='❌' onClick={() => mutations.handleJoinRequest('declined', offer, user)}>decline</IconButton>
              </div>
            </div>
          ))

        const joined = offer.joined
          .filter((user: OfferJoinedUser) => user.status === 'accepted')
          .map((user: OfferJoinedUser, index) => (
            <div className='offer-item-joined' key={index}>
              <div className='offer-item-joined-user'>
                <img className='offer-item-joined-avatar' src={user.avatar} />
                <p>{user.name}<br />is onboard <Icon value='🎒' /></p>
              </div>
              <div className='offer-item-joined-actions'>
                <IconButton value='🥾' onClick={() => mutations.handleJoinRequest('pending', offer, user)}>kick</IconButton>
              </div>
            </div>
          ))

        const declined = offer.joined
          .filter((user: OfferJoinedUser) => user.status === 'declined')
          .map((user: OfferJoinedUser, index) => (
            <div className='offer-item-joined' key={index}>
              <div className='offer-item-joined-user'>
                <img className='offer-item-joined-avatar' src={user.avatar} />
                <p>{user.name}<br />declined <Icon value='😿' /></p>
              </div>
              <div className='offer-item-joined-actions'>
                <IconButton value='💫' onClick={() => mutations.handleJoinRequest('pending', offer, user)}>retry</IconButton>
              </div>
            </div>
          ))

        if (data.user) {
          if (data.user.id === offer.user.id) {
            actions = [
              viewOffer,
              endOffer
            ]
          } else {
            if (offer.joined.filter(user => user.status !== 'cancelled').map(user => user.id).includes(data.user.id)) {
              actions = [
                cancelHi
              ]
            } else {
              actions = [
                sayHi
              ]
            }
          }
        } else {
          actions = [
            sayHi
          ]
        }

        return (
          <div className='offer-item' key={index}>
            <div className='offer-item-places'>
              <span><Icon value='🚀' />{offer.departure}</span>
              <span><Icon value='➩' strong /> <Icon value='⛱' />{offer.arrival}</span>
            </div>
            <div className='offer-item-details'>
              <div className='offer-item-vehicle'><Icon value={
                offer.vehicle.includes('car') ? '🚗 '
                  : offer.vehicle.includes('bike') ? '🛵 '
                    : offer.vehicle.includes('van') ? '🚐 '
                      : offer.vehicle.includes('bus') ? '🚌 '
                        : offer.vehicle.includes('bicycle') ? '🚵 '
                          : offer.vehicle.includes('boat') ? '⛵ ' : ''
              } />{offer.vehicle}</div>
              <div className='offer-item-time'>
                <div className='offer-item-date-text'>
                  {['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'][new Date(offer.date).getDay()]}
                  &nbsp;
                  {offer.date.split('-')[2]}/{offer.date.split('-')[1]}
                </div>
                <div className='offer-item-time-text'>
                  <img src={offer.user.avatar} className='offer-item-time-icon offer-item-avatar' />
                  {offer.time}
                </div>
                <div className='offer-item-time-relative'>
                  {relativeTime(new Date(offer.date + ' ' + offer.time))}
                </div>
              </div>
              <div className='offer-item-people'>
                <div className='offer-item-price'>{offer.price.replace(/euro|ευρώ|ευρω/g, '€')}</div>
              </div>
            </div>
            <div className='offer-item-bottom'>
              <div className='offer-item-people-figures'>
                {(() => {
                  let now = offer.joined.filter(user => user.status !== 'cancelled').length + 1
                  let x = []
                  return times(offer.capacity, (i, arr) => <div key={i} className={(--now > 0 ? 'active' : 'inactive') + ' person'}><Icon value='💺' /></div>)
                    .reduce((p, n, i, arr) => {
                      if (x.length + 1 >= arr.length / (arr.length > 10 ? 4 : 2) || i === arr.length - 1) {
                        x.push(n)
                        p.push(<div className='offer-item-people-figures-group' key={i}>{x}</div>)
                        x = []
                        if (2 % (p.length - 1) === 0) p.push(<div key={i * 100} style={{ height: '8px' }}>&nbsp;</div>)
                        return p
                      } else {
                        x.push(n)
                        return p
                      }
                    }, [])
                })()}
              </div>

              <div className='offer-item-actions'>
                {actions.map((action, index) => <div key={index}>{action}</div>)}
              </div>
            </div>

            {data.user && data.user.id === offer.user.id && pending.length > 0 ? pending : null}

            {data.user && data.user.id === offer.user.id && joined.length > 0 ? joined : null}

            {data.user && data.user.id === offer.user.id && declined.length > 0 ? declined : null}
          </div>
        )
      })
  }</div>
