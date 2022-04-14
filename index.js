import express from 'express'
import axios from 'axios'

const app = express()
const PORT = 4000

// POKEMON API
const pokemonApiUrl = 'https://pokeapi.co/api/v2'

const getPokemon = async () => {
  // ? get the pokemon
  try {
    const { data } = await axios.get(`${pokemonApiUrl}/pokemon`, {
      params: {
        offset: 0,
        limit: 10,
      },
    })
    // console.log('pokemonData-->', data)
    // ? take the pokemon name as parameter and return the description
    const getDescription = async (pokeName) => {
      try {
        const { data } = await axios.get(`${pokemonApiUrl}/pokemon-species/` + pokeName, {
          params: {
            offset: 0,
            limit: 20,
          },
        })
        console.log('Description: ', data.flavor_text_entries[1].flavor_text)
      } catch (error) {
        console.log(error)
        // return ({ status: 404, json: {error: error.message}})
      }
    }
    getDescription('pikachu')
    getDescription('charmander')

    // ? store the data needed for each pokemon
    const pokeObj = data.results.map((poke, index) => {
      return {
        name: poke.name,
        url: poke.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        id: index + 1,
      }
    })
    console.log(pokeObj)
  } catch (error) {
    console.log(error)
    // return ({ status: 404, json: {error: error.message}})
  }
}
const pokeData = getPokemon('charizard')
console.log('pokeData', pokeData)

// MIDDLEWARE
app.use(express.json())

// ROUTES
const router = express.Router()

// GOTTA CATCH EM ALL
router.route('/pokemon/:id').get(getPokemon)

// CATCH ALL RESPONSE
app.use((_req, res) => {
  return res.status(404).json({ message: 'Route not found' })
})

// LOGGER
app.use((req, _res, next) => {
  console.log(`🪶📜 Request for pokemon received: ${req.method} - ${req.url}`)
  next()
})

app.listen(PORT, () => console.log(`🤖 Server running on port ${PORT}`))
