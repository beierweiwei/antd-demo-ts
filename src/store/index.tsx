import thumkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rooterReducer from './reducers'
// import { StoreState } from '../types'
import { ProductAction } from './actions'
const store = createStore<StoreState, ProductAction, any, any >(
  rooterReducer,
  applyMiddleware(
    thumkMiddleware
  )
)
export default store