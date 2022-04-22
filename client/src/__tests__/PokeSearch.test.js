import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import axios from 'axios'
import Loader from '../components/Loader'


import Select from 'react-select'
import selectEvent from 'react-select-event'


afterEach(cleanup)

// test that the loader component renders on loading data
test('Should render loading state', 
  () => {
    axios.get.mockRejectedValueOnce()
    render(<Loader />)
    const loadingIndicator = screen.getByTestId('loading')
    expect(loadingIndicator).toBeInTheDocument()
  }
)

test.skip('Should render pokeData on select of pokemon', async () => {
  
  const mockOptions = ['pikachu', 'charizard']
  
  const {getByTestId, getByLabelText} = render(
    <form data-testid="form">
      <label htmlFor="pokemon">Pokemon</label>
      <Select options={mockOptions} name="pokemon" inputId="pokemon" isMulti />
    </form>,
  )
  expect(getByTestId('form')).toHaveFormValues({pokemon: ''}) // empty select
  
  // select two values...
  await selectEvent.select(getByLabelText('Pokemon'), ['pikachu', 'charizard'])
  expect(getByTestId('form')).toHaveFormValues({pokemon: ['pikachu', 'charizard']})
  
  // ...and add a third one
  await selectEvent.select(getByLabelText('Pokemon'), 'eevee')
  expect(getByTestId('form')).toHaveFormValues({
    pokemon: ['pikachu', 'charizard', 'eevee'],
  })
})


