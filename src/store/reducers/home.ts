import { ProductAction } from '../actions'
import ads, { ReceiveAds } from './ads';
import products from './products';
export default function home(state: HomeState = {
  ads: {
    list: [],
    count: 0
  },
  products: {
    isLoading: false,
    isAllLoaded: false,
    curtPage: 0,
    pageSize: 10,
    list: [],
    count: 0
  }
},
  action: ProductAction | ReceiveAds) {
  if (action.page === 'home') {
    const productsState = products(state.products, (action as ProductAction))
    const adsState = ads(state.ads, (action as ReceiveAds))
    return {
      products: productsState,
      ads: adsState
    }
  } else {
    return state
  }
  
  
}