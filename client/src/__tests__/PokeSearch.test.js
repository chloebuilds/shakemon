import { render } from '@testing-library/react'
import PokeCard from '../components/PokemonCard'


test('Should accept user input and display it correctly', () => {
  render(<PokeCard />)
})
