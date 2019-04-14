import {
  INCREMENT,
  INCREMENTING,
  INCREMENTED
} from '../actions/counterActions/ActionTypes'

export const initialState = {
  number: 0,
  incrementing: false
}
const counter = (state = initialState, action) => {
  let newState = state
  switch (action.type) {
    case INCREMENTING: {
      newState = {
        ...newState,
        incrementing: true
      }
      return newState
    }
    case INCREMENT: {
      newState = {
        ...newState,
        number: newState.number + 1
      }
      return newState
    }
    case INCREMENTED: {
      newState = {
        ...newState,
        incrementing: false
      }
      return newState
    }
    default:
      return newState
  }
}

export default counter
