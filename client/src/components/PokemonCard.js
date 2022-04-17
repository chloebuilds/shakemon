import React from 'react'
import CardBack from '../assets/pokemon-card-back.png'


function PokemonCard({ pokeData }) {

  return (
    <section className="pokemon-card-display">
    
    <div className='pokemon-card'>
      <h3>{pokeData.name}</h3>
      <img src={pokeData.sprite} alt={pokeData.name}/>
      <p>{pokeData.description}</p>
    </div>
    <div>
      <img src={CardBack} alt="Pokemon Card Back"/>
    </div>
    </section>
  )
}

export default PokemonCard