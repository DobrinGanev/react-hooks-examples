import React, { useReducer } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import CounterRedux from './components/CounterRedux'
import Counter from './components/Counter'
import PubSub from './components/PubSub'
import counterReducer, { initialState } from './store/reducers/counterReducer'
import thunk from './store/thunk'
const store = configureStore()

export const CounterContext = React.createContext(null)

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, initialState)
  return (
    <>
      <Provider store={store}>
        <CounterRedux />
      </Provider>
      <CounterContext.Provider value={thunk(counterDispatch)(counter)}>
        <Counter counter={counter} />
        <PubSub />
      </CounterContext.Provider>
    </>
  )
}

export default App
