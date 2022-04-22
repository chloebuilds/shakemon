import React from 'react'
import pokeball from '../assets/pokeball.png'

function Loader() {

  return (
    <div id="loading" data-testid="loading">
      <img src={pokeball} className='pokeball-loading' alt='Loading pokeball'/>
    </div>
  )
}

export default Loader