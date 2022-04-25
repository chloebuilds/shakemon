import React from 'react'
import CardBack from '../assets/pokemon-card-back.png'


function PokemonCard({ pokeData }) {

  return (
    <section className="pokemon-card-display" aria-label='display of chosen pokemon data'>
      <div className='pokemon-card' aria-label='pokemon card'>
        <h3>{pokeData.name}</h3>
        <img src={pokeData.sprite} alt={pokeData.name}/>
        <p>{pokeData.description}</p>
      </div>
      <div>
        <img src={CardBack} alt="Pokemon Card Back" aria-label='pokemon card back'/>
      </div>
    </section>
  )
}

export default PokemonCard