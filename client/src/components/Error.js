import React from 'react'

function Error({ errorMessage }) {

  return (
    <div className="error-message-container">
      <p id="error" data-testid="error" aria-busy="true" aria-live="polite" role="alert">
        {errorMessage}</p>
    </div>
  )
}

export default Error