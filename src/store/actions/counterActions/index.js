import { INCREMENT, INCREMENTING, INCREMENTED } from './ActionTypes'

const generateActionCreator = (type, payload) => ({
  type,
  payload
})

export const increment = () => generateActionCreator(INCREMENT)
export const incrementing = () => generateActionCreator(INCREMENTING)
export const incremented = () => generateActionCreator(INCREMENTED)

const delay = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export const incAsync = () => {
  return async (dispatch, state) => {
    dispatch(incrementing())
    await delay()
    dispatch(increment())
    dispatch(incremented())
  }
}
