import { SAVE_ORDER, REQUEST_ORDER } from 'src/constants/actions';
import { ThunkAction } from 'redux-thunk';
import { Http } from 'src/api';
import OrderList from 'src/pages/order/list';
import { ORDER } from 'src/api/api';

export const saveOrder = (data:OrderItem[]) => {
  return {
    type: SAVE_ORDER,
    data
  }
}
export const requestOrder = (data: QueryListParams) => {
  return {
    type: REQUEST_ORDER,
    params: data
  }
}
export const fetchOrder = (params:any):ThunkAction<any, any, any, any> => (dispatch, getState) => 
  Http.get(ORDER, params).then(order => dispatch(saveOrder(order)))

export type FetchOrder = typeof fetchOrder
