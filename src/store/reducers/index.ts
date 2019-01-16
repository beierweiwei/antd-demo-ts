import { combineReducers } from 'redux'
import productCates from './cates'
import home from './home';
const rootReducer = combineReducers({
  productCates,
  home
})
export default rootReducer