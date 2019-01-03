import { actions } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
// import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
// import { Dispatch } from 'react';
export interface RequestQuery extends AxiosRequestConfig {
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

export const fetchProducts: AsyncAction<Promise<ProductAction>, StoreState, OptionQuery, RequestProductAction> = (query) => {
  return  (dispatch, getState) => {
    const state = getState()
    query = query || {}
    query.pageSize = state.products.pageSize 
    query.curtPage = state.products.curtPage
    dispatch(requestProducts(query))
    
    return axios.get('http://localhost:8080/api/product/list', {params: query})
      .then(
        res => {
          return res.data.data
        },
        err => console.log(err.message)
      )
      .then(res =>
        dispatch(receiveProducts(res))
      )  
  }
}

// export const fetchProducts:AsyncAction<OptionQuery, ProductAction> = (query) => {
//   return  (dispatch, getState) => {
//     const state:StoreState = getState()
//     query = query || {}
//     query.pageSize = state.products.pageSize 
//     query.curtPage = state.products.curtPage
//     dispatch(requestProducts(query))
    
//     return axios.get('http://localhost:8080/api/product/list', {params: query})
//       .then(
//         res => {
//           return res.data.data
//         },
//         err => console.log(err.message)
//       )
//       .then(res =>
//         dispatch(receiveProducts(res))
//       )
//   }
// }