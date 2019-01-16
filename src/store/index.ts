import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rooterReducer from './reducers'
// import { StoreState } from '../types'
const store = createStore<StoreState, any, any, any >(
  rooterReducer,
  applyMiddleware(
    thunkMiddleware
  )
)
export default store