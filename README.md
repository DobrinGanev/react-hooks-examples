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

## PubSub example `useEffect

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

The above `useEffects` will subscribe and unsubcribe on every re-render
