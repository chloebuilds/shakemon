import React from 'react'

import PokeSearch from './components/PokeSearch'
import Logo from './assets/shakemon-logo.png'


function App() {

  return (
      <section className='app'>
      <img src={Logo} alt="Shakemon Logo"/>
      <PokeSearch />
      </section>
  )
}

export default App
