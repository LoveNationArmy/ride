import React from 'react'
import Icon from '../Icon'
import './style.scss'

export default ({ value, onClick, children }) =>
  <div
    className='icon-button'
    onMouseDown={onClick}
    onTouchStart={onClick}
    ><Icon value={value} /><span>{children}</span></div>
