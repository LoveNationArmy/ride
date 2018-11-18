import React from 'react'
import './style.scss'

const stop = (fn) => (event) => {
  event.stopPropagation()
  event.preventDefault()
  if (fn) fn(event)
}

export default ({ queries, mutations }) =>
  <div
    onTouchStart={stop(() => mutations.setUserMenu(false))}
    onMouseDown={stop(() => mutations.setUserMenu(false))}
    onContextMenu={stop(() => mutations.setUserMenu(false))}
    className='user-menu-overlay'>
    <div className='user-menu'>
      <div>My postings</div>
      <div onMouseDown={queries.logout}>Logout</div>
    </div>
  </div>
