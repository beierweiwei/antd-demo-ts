import { combineReducers } from 'redux'
import productCates from './cates'
import home from './home'
import products from './products'
import user from './user'
import system from './system'
import order from './order';
import cart from './cart'
const rootReducer = combineReducers({
  productCates,
  home,
  products,
  user,
  system,
  order,
  cart
})
export default rootReducer