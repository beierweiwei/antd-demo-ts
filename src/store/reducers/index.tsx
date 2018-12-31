import { combineReducers } from 'redux'
import { actions } from '../../constants'

function products (state={
  curtPage: 1,
  pageSize: 10,
  isLoading: false,
  list: []
}, action:any) {
  switch (action) {
    case actions.REQUEST_RODUCTS:
      return {
        ...state,
        isLoading: true,
        curtPage: action.requery.curtPage || 1,
        pageSize: action.requery.pageSize || 10,
      }
    case actions.RECEIVE_PRODUCTS:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.list
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