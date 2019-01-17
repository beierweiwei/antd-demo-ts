import products from './products';
import { actions } from 'src/constants';

export default function productList (state = {
  products: {
    isLoading: false, 
    curtPage: 0,
    pageSize: 10,
    list: [],
    isAllLoaded: false,
    count: 0
  },
  bannerData: undefined

}, action:any) {
  if (action.page === 'productList') {
    return {
      ...state,
      products: products(state.products, action),
      bannerData: banners(state.bannerData, action)
    }
  } else {
    return state
  }
}
function banners(state: any = {}, action: any) {
  switch (action.type) {
    case actions.RECEIVE_PRODUCTLIST_BANNERS:
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}