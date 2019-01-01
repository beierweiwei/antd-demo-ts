import { combineReducers } from 'redux'
import { actions } from '../../constants'
import { ProductState } from '../../types'
import { ProductAction } from '../actions'
function products (state:ProductState = {
  curtPage: 1,
  pageSize: 10,
  isLoading: false,
  list: []
}, 
action:ProductAction) 
{
  switch (action.type) {
    case actions.REQUEST_RODUCTS:
      return {
        ...state,
        isLoading: true,
        curtPage: action.query.curtPage || 1,
        pageSize: action.query.pageSize || 10,
      }
    case actions.RECEIVE_PRODUCTS:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.data.list
        ]
      }
    default:
      return state  
  }
}

const rootReducer = combineReducers({
  products
})
export default rootReducer