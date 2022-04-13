import express from 'express' 
import axios from 'axios'

const app = express()
const PORT = 4000

// POKEMON API
const pokemonApiUrl = 'https://pokeapi.co/api/v2'

const getPokemon = async (_req, res) => {
  // get the pokemon
  try {
    const { data } = await axios.get(`${pokemonApiUrl}/pokemon`, {
      params: {
        offset: 0,
        limit: 20,
      }
    })
    console.log(data)
  const singlePoke = data.results.find(poke => 
    poke.name === "charmander")
    console.log(singlePoke)

    // res.status(200).json()
  } catch (error) {
    console.log(error)
  }

}
getPokemon()


// MIDDLEWARE
app.use(express.json())

// ROUTES
const router = express.Router()

// GOTTA CATCH EM ALL
router.route('/pokemon/:id')
  .get(getPokemon)



// CATCH ALL RESPONSE
app.use((_req, res) => {
  return res.status(404).json({ message: 'Route not found'})
})

// LOGGER
app.use((req, _res, next) => {
  console.log(`🪶📜 Request for pokemon received: ${req.method} - ${req.url}`)
  next() 
})

app.listen(PORT, () => console.log(`🤖 Server running on port ${PORT}`))

