# react-hooks-examples

The reducer and the actions are used in both Redux and React Hooks components

## With Redux

Create Redux store with middleware(thunk) and provide it to all nested components using `Provider` component

```js
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const configureStore = () => {
  return createStore(reducers, applyMiddleware(thunk));
};
```

```js
<Provider store={store}>
  <CounterRedux />
</Provider>
```

## With React Hooks

Firt Create React Context and **_in the function_** use the `useReducer` hook

```js
import React, {useReducer} from "react";
import counterReducer, {initialState} from "./store/reducers/counterReducer";
export const CounterContext = React.createContext(null);

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, initialState);
  return (
    <>
      <CounterContext.Provider value={thunk(counterDispatch)(counter)}>
        <Counter counter={counter} />
      </CounterContext.Provider>
    </>
  );
};
```

## The `redux-thunk` equivalent to dispatch async actions

```js
const thunk = dispatch => {
  return state => action => {
    if (typeof action === "function") {
      return action(dispatch, state);
    }
    dispatch(action);
  };
};
```

## Class Component connected to the Redux store

```js
...
// dispatch increment when mounted
  componentDidMount () {
    this.props.increment()
  }
...
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}
export default connect(
  mapStateToProps,
  actions
)(CounterRedux)
```

## Functional Component using React Hooks

```js

const Counter = ({ counter }) => {
  const dispatch = useContext(CounterContext)
  const [incrementing, setIncrementig] = useState(false)

  // dispatch increment when mounted
useEffect(() => {
    dispatch(actions.increment())
  }, []) // pass an empty array to dispatch only once on mount

...

```

## PubSub example with useEffect

To run the example start the app from the server directory with `npm run dev`

According to the docs

> Does `useEffect` run after every render? Yes! By default, it runs both after the first render and after every update.

```js
useEffect(() => {
  io.on("message", message => {
    setMessage(message);
  });
  return () => {
    // unsubcribe
    io.off("message");
  };
}); // use empty array to subscribe once on component did mount
```

The above `useEffect` will subscribe and unsubcribe on every re-render


## Socket as Custom hook
```js
import { useEffect, useState } from 'react'

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

```

then in your component

```js
const PubSub = () => {
  const socketData = useSocket('message', socket)

  return (
    <>
      <h2>Pub Sub Example</h2>
      <p>Message {socketData.data}</p>
    </>
  )
}
```
## Fetching async and using abort
```js
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
    [fetchAgain] // dependency prop, if this changes the useEffect will run again
  )
 return (
    <>
      isLoading ? <h3>Loading</h3> : <p>{response.data}</p>}
      <button onClick={() => setFetchAgain(Math.random())}>Fetch Again</button>
    </>
  )
```
## Re-render only Consumers
```js
 <RerenderContext.Provider value={inc}>
        <Parent />
  </RerenderContext.Provider>

```
The parent should be PureComponent
```js
class Parent extends React.PureComponent {
  render () {
    return (
      <>
        <ConsumerChild /> // consumer will re-render
        <Sibling /> // sibling should not re-render 
      </>
    )
  }
}
```
```js
const ConsumerChild = props => {
  const count = useContext(RerenderContext)
  return <div>Consumer that should update every time. count {count}</div>
}
```



