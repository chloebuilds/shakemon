import React, { useEffect } from 'react'
// import axios from 'axios'
import PokeSearch from './components/PokeSearch'

function App() {

  // const id = 25

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get(`/pokemon/${id}`) 
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <>
      <h1>Shakemon</h1>
      <PokeSearch />
    </>
  )
}

export default App
