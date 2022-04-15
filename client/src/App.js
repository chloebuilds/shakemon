import React, { useEffect } from 'react'
import axios from 'axios'

function App() {

  const id = 6

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/pokemon/${id}`) 
      console.log(data)
    }
    getData()
  })

  return <h1>Hello World</h1>
}

export default App
