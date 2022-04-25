import React from 'react'
import { cleanup, render, screen, getByTestId } from '@testing-library/react'
import Loader from '../components/Loader'
import Error from '../components/Error'
import PokeSearch from '../components/PokeSearch'
import AsyncSelect from 'react-select'
// import selectEvent from 'react-select-event'


afterEach(cleanup)

test('Should render loading state', () => {
    render(<Loader />)
    const loadingIndicator = screen.getByTestId('loading')
    expect(loadingIndicator).toBeInTheDocument()
  }
)

test('Should render error component', () => {
    const message = 'TEST_ERROR_MESSAGE'
    render(<Error message={message}/>)
    const errorMessage = screen.getByTestId('error')
    expect(errorMessage).toBeInTheDocument()
    // expect(errorMessage).toHaveTextContent(message)
  }
)


test('renders the react-select to search for the pokemon', () => {
    render(<PokeSearch />)
    const pokemonSearch = screen.getByLabelText('pokemon-search-select')
    expect(pokemonSearch).toBeInTheDocument()
  }
)


test('React-select/async should select a pokemon choice', async () => {
  const mockOption = ['pikachu']
  
  const {getByTestId, 
        //getByLabelText
      } = render(
    <form data-testid="form">
      <label htmlFor="pokemon-search-select">Select your Pokemon</label>
      <AsyncSelect options={mockOption} name="pokemon" inputId="pokemon-search-select" />
    </form>,
  )
  expect(getByTestId('form')).toHaveFormValues({pokemon: ''})
  // await selectEvent.select(getByLabelText(/select your pokemon/i), [/pikachu/i])
  // expect(getByTestId('form')).toHaveFormValues({pokemon: [/pikachu/i]})
})




