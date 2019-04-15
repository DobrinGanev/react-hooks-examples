import React, { useState, useEffect } from 'react'
import socketIO from 'socket.io-client'

const io = socketIO.connect('http://localhost:5000')
const PubSub = () => {
  const [message, setMessage] = useState(false)

  /* From the docs https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  Does useEffect run after every render? Yes!
  By default, it runs both after the first render and after every update.
  */
  useEffect(() => {
    io.on('message', message => {
      setMessage(message)
    })
    return () => {
      // unsubcribe
      io.off('message')
    }
  }) // use empty array to subscribe once on component did mount

  return (
    <>
      <h2>Pub Sub Example</h2>
      <p>Message {message}</p>
    </>
  )
}

export default PubSub
