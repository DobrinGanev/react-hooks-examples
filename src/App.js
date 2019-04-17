import React, { useReducer, useState } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import CounterRedux from './components/CounterRedux'
import Counter from './components/Counter'
import PubSub from './components/PubSub'
import Parent from './components/Rerender/Parent'
import counterReducer, { initialState } from './store/reducers/counterReducer'
import thunk from './store/thunk'
import Fetch from './components/Fetch'
const store = configureStore()

export const CounterContext = React.createContext(null)
export const RerenderContext = React.createContext(null)

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, initialState)
  const [inc, setInc] = useState(0)
  const increment = () => {
    setInc(inc => inc + 1)
  }
  return (
    <>
      <Provider store={store}>
        <CounterRedux />
      </Provider>
      <CounterContext.Provider value={thunk(counterDispatch)(counter)}>
        <Counter counter={counter} />
        <PubSub />
        <Fetch />
      </CounterContext.Provider>
      <br />
      <br />
      <button onClick={increment}>Inc To Render </button>
      <RerenderContext.Provider value={inc}>
        <Parent />
      </RerenderContext.Provider>
    </>
  )
}

export default App
