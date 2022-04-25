import React from 'react'
import pokeball from '../assets/pokeball.png'

const Loader = () => {

  return (
    <div id="loading" data-testid="loading">
      <img src={pokeball} className="pokeball-loading" alt="Loading - shaking pokeball" aria-busy="true" aria-live="polite" role="alert" aria-label="Loading"/>
    </div>
  )
}

export default Loader