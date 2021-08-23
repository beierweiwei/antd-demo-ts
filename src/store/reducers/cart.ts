import { actions } from '../../constants'
import { ThunkAction } from 'redux-thunk'
import http from 'src/api/http'

interface CartParams {
  type: string
  id: string
  num: number
}
export const setCart = (list:Product[]) => {
  return {
    type: actions.SET_CART_PRODUCTS,
    list
  }
}
export const updateCart = (params: CartParams):(ThunkAction<any, any, any, any>) => { 
  return (dispatch, getState) => {http.post('/cart/my', params).then(res => {
      console.log(res)
    })}}

export const fetchCart = (params: QueryListParams):(ThunkAction<any, any, any, any>) => { 
  return (dispatch, getState) => http.get('/cart/my', { params }).then((res) => {
    const list = res || []
    dispatch(setCart(list))
    })}
// reducers 
export default function carts(state =
  {
    list: [],
  },
  action: any) {
  switch (action.type) {
    case actions.SET_CART_PRODUCTS:
      return {
        ...state,
        list: action.list
      }
    default:
      return state
  }
}