import React from 'react'

const Error = ({ errorMessage }) => {

  console.log(errorMessage)

  return (
    <div className="error-message-container">
      <p className="error-message" data-testid="error" aria-busy="true" aria-live="polite" role="alert">
        {errorMessage}</p>
    </div>
  )
}

export default Error