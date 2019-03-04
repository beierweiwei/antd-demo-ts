import { combineReducers } from 'redux'
import productCates from './cates'
import home from './home'
import productList from './productList'
import user from './user'
import system from './system'
const rootReducer = combineReducers({
  productCates,
  home,
  productList,
  user,
  system
})
export default rootReducer