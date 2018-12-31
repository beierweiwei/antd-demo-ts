import thumkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rooterReducer from './reducers'

const store = createStore(
  rooterReducer,
  applyMiddleware(
    thumkMiddleware
  )
)
export default store