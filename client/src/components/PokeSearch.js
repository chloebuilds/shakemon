import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'
import PokemonCard from './PokemonCard'
import Error from './Error'
import Loader from './Loader'

const initialData = {
  name: '',
  sprite: '',
  description: ''
}

function PokeSearch() {

  const [allPokemonData, setAllPokemonData] = React.useState([])
  const [pokeData, setPokeData] = React.useState(initialData)
  const [value, setValue] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  
React.useEffect(() => {
  setLoading(true)
  const getAllPokemonData = async () => {
    try { // getting all the pokemon so that I can filter through them to have an autopopulate search as the user types
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=898')
      setAllPokemonData(data.results)
    } catch (err) {
      console.log(err)
    }
  }
  getAllPokemonData()
  setLoading(false)
}, [])


  const handleLoadOptions = async (inputValue) => {
    setError('')
    try { // return the filtered pokemon names as the user searches, for an autopopulating search feature
      const filteredPokemon = allPokemonData.filter((singlePokemon) => {
        return singlePokemon.name.toLowerCase().startsWith(inputValue.toLowerCase())
      })
      return filteredPokemon.map((poke) => ({ 
        label: poke.name,
        value: poke.name
      }))
    } catch (err) {
      console.log(err)
      setError('Could not find the pokemon')
    }
  }

  const handleChange = async ({ value: name }) => {
    setLoading(true)
      const { data } = await axios.get( // request to get all of the pokemon's data
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      )
      if (data.response === 'False') { // if no response then set the error message
        setError('Cannot find the pokemon you are looking for')
        return
      }
    const pokeId = data.id
    const finalData = await axios.get( // make the request to the backend with the id of the pokemon from pokemon API
      `/pokemon/${pokeId}`
    )
    console.log(finalData)
    if (finalData.isAxiosError) { // if there is no data, set an error
      setError('There was an error getting the pokemon details')
      return
  }
  setPokeData({ // set the pokeData with the data from the backend with the shakespeare description
    name: finalData.data.name,
    sprite: finalData.data.sprite,
    description: finalData.data.description
  })
  setValue(null)
  setLoading(false)
}

  return  (
    <>
    {loading && <Loader />}
    <div className='search-container'>
      <p> Enter the name of the pokemon you are searching for below and see Shakespeare describe your chosen pokemon.</p>
        <div className='search-bar'>
        <AsyncSelect 
          placeholder='Type to find a pokemon..'
          loadOptions={handleLoadOptions} 
          onChange={handleChange} 
          value={value}
          />
          {error && <Error errorMessage={error}/>}
        </div>
      </div>
      <PokemonCard pokeData={pokeData}/>
      </>
  )
}

export default PokeSearch