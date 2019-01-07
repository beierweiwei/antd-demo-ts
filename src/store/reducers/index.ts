import { combineReducers } from 'redux'
import products from './products'
import ads from './ads'
import productCates from './cates'
const rootReducer = combineReducers({
  products,
  ads,
  productCates
})
export default rootReducer