import React from 'react'
import emoji from 'react-easy-emoji'
import './style.scss'

const stop = (fn) => (event) => {
  event.stopPropagation()
  event.preventDefault()
  if (fn) fn(event)
}

export default ({
  children,
  className,
  value,
  active,
  strong,
  onClick
}) => {
  onClick = stop(onClick)
  return <span
    onTouchStart={onClick}
    onMouseDown={onClick}
    onContextMenu={onClick}
    className={[
      'icon',
      className,
      active ? 'active' : null,
      strong ? 'strong' : null
    ].filter(Boolean).join(' ')
    }>{emoji(value || '')}{children}</span>
}
