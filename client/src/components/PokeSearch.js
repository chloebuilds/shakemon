import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'

import PokemonCard from './PokemonCard'

const initialData = {
  name: '',
  sprite: '',
  description: ''
}

function PokeSearch() {

  const [pokeData, setPokeData] = React.useState(initialData)
  const [error, setError] = React.useState(null)
  
  const handleLoadOptions = async (inputValue) => {
    setError('')
    console.log(inputValue)
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${inputValue}`
      )
      console.log('data from pokemon API -->', data)
      if (data.Response === 'False') {
        return []
      }
      return Array({ // react-select needs an array to map over the options
        label: data.name,
        value: data.id
      })
    } catch (err) {
      console.log(err)
      setError('Could not find the pokemon')
    }
  }

  const handleChange = async ({ value: id }) => {
    // on change, make the request to the back end with the id of the pokemon from pokemon API
    console.log('id', id)
    const { data } = await axios.get(
      `/pokemon/${id}`
    )
    console.log('pokemon data', data)
    // if there is no response, set an error
    if (data.Response === 'False') {
      setError('There was an error setting the data')
      return
  }
  // set the pokemon data with the data from the backend with the shakespeare description
  setPokeData({
    name: data.name,
    sprite: data.sprite,
    description: data.description
  })
  console.log(pokeData)
}

// ! still need to display error messages
  return  (
    <>
      <p> Enter the name of the pokemon you are searching for below and see Shakespeare describe your chosen pokemon.</p>
      <AsyncSelect 
        placeholder='Type to find a pokemon..'
        loadOptions={handleLoadOptions} 
        onChange={handleChange} 
        />
      <div>
      <PokemonCard pokeData={pokeData}/>
      </div>
      </>
  )
}

export default PokeSearch