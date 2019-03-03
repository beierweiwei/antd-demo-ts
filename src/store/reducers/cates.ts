import { actions } from '../../constants'
// import { AsyncAction } from '../actions'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Http } from '../../api/index'

// Actions
export const fetchProductCates: ThunkAction<any, any, any, any> = (disPatch, getSate) => {
  return Http.get('/product/cate')
    .then(
    (res: any) => disPatch(receiveProductCates({data: res})),
      (err:Error) => console.log(err.message)
    )
}
interface ReceiveProductCates extends Action<actions.RECEIVE_PRODUCT_CATES> {
  data: ProductCateState
}
const receiveProductCates = (data: ProductCateState = { data: []}) => {
  return {
    type: actions.RECEIVE_PRODUCT_CATES,
    data
  }
}
// reducers 

// type AdsReducer = (ActivitiesState, any) => ActivitiesState
export default function productCates(state: ProductCateState =
  {
    data: []
  },
  action:ReceiveProductCates) {
  switch (action.type) {
    case actions.RECEIVE_PRODUCT_CATES:
      const res = action.data.data
      return {
        ...state,
        data: res,
      }
    default:
      return state
  }
}