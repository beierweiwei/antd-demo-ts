import { combineReducers } from 'redux'
import productCates from './cates'
import home from './home'
import productList from './productList'
import user from './user'
const rootReducer = combineReducers({
  productCates,
  home,
  productList,
  user
})
export default rootReducer