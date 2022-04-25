import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async'
import PokeCard from './PokeCard'
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
  const [ariaFocusMessage, setAriaFocusMessage] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
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
      if (data.response === 'false') { // if no response then set the error message
        setError('Cannot find the pokemon you are looking for')
        return
      }
    const pokeId = data.id
    const finalData = await axios.get( // make the request to the backend with the id of the pokemon from pokemon API
      `/pokemon/${pokeId}`
    )
  
    if (finalData.isAxiosError) { // if there is no data - set an error
      setError('You\'ve reached the maximum number of requests. Please try again in an hour.')
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

  // ACCESSIBILITY FOR SELECT
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const onFocus = ({ focused, isDisabled }) => {
    const msg = `You are currently focused on option ${focused.label}${
      isDisabled ? ', disabled' : ''
    }`;
    console.log(msg)
    setAriaFocusMessage(msg);
    
    return msg;
  };

  return  (
    <>
    {loading && <Loader/>}
    <div className="search-container">
      <p> Enter the name of the Pokemon you are searching for below and see Shakespeare describe your chosen Pokemon on the Pokemon card.</p>
        <div className="search-bar" data-testid="pokemon-search">
        <form data-testid="form" role="search">
          <label className="sr-only" htmlFor="pokemon-search-select" data-testid="sr-only" aria-label='pokemon-search-select'>
            Select your Pokemon
          </label>

          {!!ariaFocusMessage && !!isMenuOpen && (
        <blockquote className="sr-only" data-testid="sr-only">"{ariaFocusMessage}"</blockquote>
        )}

        <AsyncSelect 
          placeholder="Type to find a pokemon.."
          aria-placeholder="Type to find a pokemon"
          name="pokemon"
          loadOptions={handleLoadOptions} 
          onChange={handleChange} 
          value={value}
          inputId="pokemon-search-select"
          ariaLiveMessages={{onFocus}}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          />
          </form>
          {error && <Error errorMessage={error}/>}
        </div>
      </div>
      <PokeCard pokeData={pokeData}/>
      </>
  )
}

export default PokeSearch