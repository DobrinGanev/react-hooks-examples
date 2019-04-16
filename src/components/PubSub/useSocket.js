import { useEffect, useState } from 'react'

// custom hook
export const useSocket = (event, socket) => {
  const [data, setData] = useState({})

  useEffect(() => {
    if (event) {
      socket.on(event, data => {
        setData({ data })
      })

      return () => socket.removeListener(event)
    }
  })

  return data
}
