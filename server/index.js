import express from 'express'
import axios from 'axios'

const app = express()
const PORT = 4000

// POKEMON API
const pokemonApiUrl = 'https://pokeapi.co/api/v2'


// MIDDLEWARE
app.use(express.json())

// ROUTE - GOTTA CATCH EM ALL
app.get('/pokemon/:id', async (req, res) => {
  try {
    // Response object
    const response = {}

    // Get pokemon data
    const { data } = await axios.get(`${pokemonApiUrl}/pokemon-form/${req.params.id}`)

    // Add name & sprite to response object
    response.name = data.name
    response.sprite = data.sprites.front_default

    // Get description
    let resp = await axios.get(`${pokemonApiUrl}/pokemon-species/${req.params.id}`)

      const respEN = resp.data.flavor_text_entries.find(entry => entry.language.name === 'en')

        // Get translation
        resp = await axios.post('https://api.funtranslations.com/translate/shakespeare.json', {
          text: respEN.flavor_text
        })
        // Add Translated description to response object
        response.description = resp.data.contents.translated

    // Return to user
    return res.status(200).json(response)
  } catch (error) {
    console.log('error', error)
    return res.status(404).json({ message: 'Uh oh! We have an error!'})
  }
})

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


// module.exports = { respEN }