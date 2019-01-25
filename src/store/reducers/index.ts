import { combineReducers } from 'redux'
import productCates from './cates'
import home from './home'
import productList from './productList'
const rootReducer = combineReducers({
  productCates,
  home,
  productList
})
export default rootReducer