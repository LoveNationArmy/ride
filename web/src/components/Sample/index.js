import React from 'react'

export default ({ data, queries, mutations }) =>
  <div>
    <div>
      {data.status} {data.response}
      <button onClick={queries.ping}>ping</button>
    </div>
    {data.value}
    <button onClick={mutations.increaseValue}>+</button>
    <button onClick={mutations.decreaseValue}>-</button>
  </div>