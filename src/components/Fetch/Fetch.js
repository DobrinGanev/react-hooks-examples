import React, { useState, useEffect } from 'react'

const Fetch = () => {
  const [response, setResponse] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [fetchAgain, setFetchAgain] = useState(false)

  const controller = new AbortController()
  const fetchData = async () => {
    setIsLoading(true)
    const response = await fetch('http://localhost:5000/getData', {
      signal: controller.signal
    })
    const json = await response.json()
    setResponse(json)
    setIsLoading(false)
  }
  useEffect(
    () => {
      fetchData()
      return () => controller.abort()
    },
    [fetchAgain]
  )

  return (
    <>
      <h2>Fetch Data Async using useEffect with abort</h2>
      {isLoading ? <h3>Loading</h3> : <p>{response.data}</p>}
      <button onClick={() => setFetchAgain(Math.random())}>Fetch Again</button>
    </>
  )
}

export default Fetch
