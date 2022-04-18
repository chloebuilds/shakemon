import React from 'react'

function Error({ errorMessage }) {

  return (
    <div className='error-message-container'>
      <p className='error-message'>{errorMessage}</p>
    </div>
  )
}

export default Error