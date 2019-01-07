import { actions } from '../../constants'
// import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Http } from '../../api'
// import { Dispatch } from 'react';
export interface RequestQuery  {
  pageSize?: number
  curtPage?: number
  filter?: any
}
export type OptionQuery = RequestQuery | null
export interface RequestProductAction {
  type: actions.REQUEST_PRODUCTS
  query?: OptionQuery
}


interface ProductListApi {
  list: Product[]
  count: number
}

export interface ReceiveProductsAction  {
  type: actions.RECEIVE_PRODUCTS
  data: ProductListApi
}


export type ProductAction = RequestProductAction | ReceiveProductsAction

export type AsyncAction<R, S, E, A> = (payload:E) => ThunkAction<R, S, E, any>

export function requestProducts (query: OptionQuery):RequestProductAction {
  return {
    type: actions.REQUEST_PRODUCTS,
    query
  }
}

function receiveProducts(data:ProductListApi): ReceiveProductsAction{
  return {
    type: actions.RECEIVE_PRODUCTS,
    data
  }
}

export const fetchProducts: AsyncAction<any, StoreState, OptionQuery, RequestProductAction> = (query) => {
  return  (dispatch, getState) => {
    dispatch(requestProducts(query))
    const state = getState()
    const tempQuery:any = {}
    tempQuery.pageSize = state.products.pageSize
    tempQuery.curtPage = state.products.curtPage
    return Http.get('product/list', { params: tempQuery})
      .then(
        (res:any) => {
          dispatch(receiveProducts(res))
          return res
        },
        err => console.log(err.message)
      ) 
  }
}