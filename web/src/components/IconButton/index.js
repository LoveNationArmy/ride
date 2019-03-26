import React from 'react'
import Icon from '../Icon'
import './style.scss'

export default ({ value, onClick, children }) =>
  <div
    className='icon-button'
    onClick={onClick}
  ><Icon value={value} /><span>{children}</span></div>
