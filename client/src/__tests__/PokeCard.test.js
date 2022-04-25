import { cleanup, render } from '@testing-library/react'
import axios from 'axios'
import PokeCard from '../components/PokeCard'

afterEach(cleanup)

test('Should display the pokeData in the PokeCard in PokeSearch',  () => {
    const mockPokeData = [
      {
        name: 'charizard',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        description: 'Spits fire yond is hot enow to melt boulders. Known to cause forest fires unintentionally.',
      },
    ]
    axios.get.mockResolvedValueOnce({ data: mockPokeData })
    render(<PokeCard pokeData={mockPokeData} />)
  }
)

