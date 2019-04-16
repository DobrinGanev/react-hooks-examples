import React from 'react'
import socketIO from 'socket.io-client'
import { useSocket } from './useSocket'

const socket = socketIO.connect('http://localhost:5000')
// the socket can be passed and grabbed with the context
const PubSub = () => {
  const socketData = useSocket('message', socket)

  return (
    <>
      <h2>Pub Sub Example</h2>
      <p>Message {socketData.data}</p>
    </>
  )
}

export default PubSub
