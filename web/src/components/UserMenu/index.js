import React from 'react'
import './style.scss'

const stop = (fn) => (event) => {
  event.stopPropagation()
  event.preventDefault()
  if (fn) fn(event)
}

export default ({ data, queries, mutations }) =>
  <div
    onTouchEnd={stop(() => mutations.setUserMenu(false))}
    onMouseDown={stop(() => mutations.setUserMenu(false))}
    className='user-menu-overlay'>
    <div className='user-menu'>
      <div onTouchStart={queries.logout}>Logout</div>
    </div>
  </div>
