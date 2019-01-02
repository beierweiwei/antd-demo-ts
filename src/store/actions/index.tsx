import { actions } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'react';
export interface RequestQuery extends AxiosRequestConfig {
  pageSize?: number
  curtPage?: number
  filter?: any
}
export type OptionQuery = RequestQuery | null
export interface RequestProductAction {
  type: typeof actions.REQUEST_PRODUCTS
  query?: OptionQuery
}


interface ProductListApi {
  list: Product[]
  count: number
}

export interface ReceiveProductsAction {
  type: typeof actions.RECEIVE_PRODUCTS
  data: ProductListApi
}


export type ProductAction = RequestProductAction | ReceiveProductsAction

type AsyncActionFunc<A> = (dispatch:Dispatch<A>, getState:any) => any
type AsyncAction<P, A> = (payload:P) => AsyncActionFunc<A>

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

export const fetchProducts:AsyncAction<OptionQuery, ProductAction> = (query) => {
  return  (dispatch, getState) => {
    const state:StoreState = getState()
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