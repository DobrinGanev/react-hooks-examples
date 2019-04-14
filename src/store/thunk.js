const thunk = dispatch => {
  return state => action => {
    if (typeof action === 'function') {
      return action(dispatch, state)
    }
    dispatch(action)
  }
}

export default thunk
