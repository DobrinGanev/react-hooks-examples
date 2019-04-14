import React, { useState, useContext, useEffect } from 'react'
import { CounterContext } from '../../App'
import * as actions from '../../store/actions/counterActions'

const delay = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const Counter = ({ counter }) => {
  const dispatch = useContext(CounterContext)
  const [incrementing, setIncrementig] = useState(false)

  const incAsync = async () => {
    setIncrementig(true)
    await delay()
    dispatch(actions.increment())
    setIncrementig(false)
  }

  useEffect(() => {
    dispatch(actions.increment())
  }, []) // pass an empty array to dispatch only once on mount

  const inc = async () => {
    dispatch(actions.increment())
  }

  const asyncAction = () => {
    dispatch(actions.incAsync())
  }

  return (
    <>
      <h2>React Hooks</h2>
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => incAsync()}>Increment Async</button>
      <button onClick={() => asyncAction()}>Increment with Async Action</button>
      <p>Local component incrementing state </p>
      {incrementing ? <h3>Incrementing Counter...</h3> : null}
      <p>{counter.number}</p>

      <p>Reducer incrementing state </p>
      {counter.incrementing ? <h3>Incrementing Counter...</h3> : null}
    </>
  )
}

export default Counter
