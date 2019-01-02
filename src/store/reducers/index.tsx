import { combineReducers } from 'redux'
import { actions } from '../../constants'
// import { ProductState } from '../../types'
import { ProductAction } from '../actions'
function products (state:ProductState = {
  curtPage: 0,
  pageSize: 10,
  isLoading: false,
  list: []
}, 
action:ProductAction) 
{
  switch (action.type) {
    case actions.REQUEST_PRODUCTS:
      const query = action.query || {}
      return {
        ...state,
        isLoading: true,
        curtPage: query.curtPage || state.curtPage + 1,
        pageSize: query.pageSize || state.pageSize
      }
    case actions.RECEIVE_PRODUCTS:
      return {
        ...state,
        isLoading: false,
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