import { actions } from '../../constants'
import { ProductAction } from '../actions'
export default function products(state: ProductState = {
  curtPage: 0,
  pageSize: 10,
  isLoading: false,
  isAllLoaded: false,
  count: 0,
  list: []
},
  action: ProductAction) {
  console.log(state)
  switch (action.type) {
    case actions.REQUEST_PRODUCTS:
      // 下拉加载会促发多次request，根据isLoading来判断是否更新请求参数
      if (state.isAllLoaded || state.isLoading) {
        return state
      } else {
        const query = action.query || {}
        const curtPage = query.curtPage !== undefined ? query.curtPage : state.curtPage + 1
        const pageSize = query.pageSize || state.pageSize
        return {
          ...state,
          isLoading: true,
          curtPage,
          pageSize,
          list: curtPage < 1 ? [] : state.list
        }
      }
    case actions.RECEIVE_PRODUCTS:
      let isAllLoaded = state.isAllLoaded
      const data = action.data || {}
      console.log('---------', data)
      if (isAllLoaded) {
        return state
      } else {
        isAllLoaded = state.pageSize * state.curtPage >= data.count
        return {
          ...state,
          isAllLoaded,
          isLoading: false,
          list: [
            ...(state.list),
            ...(data.list)
          ],
          count: data.count
        }
      }
    default:
      return state
  }
}