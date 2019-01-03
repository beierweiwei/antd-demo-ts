import { combineReducers } from 'redux'
import { actions } from '../../constants'
import { ProductAction } from '../actions'
import ads from './ads'
function products (state:ProductState = {
  curtPage: 0,
  pageSize: 10,
  isLoading: false,
  isAllLoaded: false,
  count: 0,
  list: []
}, 
action:ProductAction) 
{
  switch (action.type) {
    case actions.REQUEST_PRODUCTS:
      if (state.isAllLoaded) {
        return state
      } else {
        const query = action.query || {}
        const curtPage = query.curtPage || state.curtPage + 1
        const pageSize = query.pageSize || state.pageSize
        
        return {
          ...state,
          isLoading: true,
          curtPage,
          pageSize
        }
      }
    case actions.RECEIVE_PRODUCTS:
      let isAllLoaded = state.isAllLoaded
      const data = action.data || {}
      if (isAllLoaded) {
        return state
      } else {
        isAllLoaded = state.pageSize * state.curtPage >= data.count 
        return {
          ...state,
          isAllLoaded,
          isLoading: false,
          list: [
            ...state.list,
            ...(data.list || [])
          ],
          count: data.count
        }
      }
    default:
      return state  
  }
}

const rootReducer = combineReducers({
  products,
  ads
})
export default rootReducer