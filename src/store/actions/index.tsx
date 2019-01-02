import { actions } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'react';
interface RequestQuery extends AxiosRequestConfig {
  pageSize?: number
  curtPage?: number
  filter?: any
}
export interface RequestProductAction {
  type: typeof actions.REQUEST_PRODUCTS
  query?: RequestQuery
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

type AsyncActionFunc<A> = (dispatch:Dispatch<A>) => any
type AsyncAction<P, A> = (payload:P) => AsyncActionFunc<A>

export function requestProducts (query: RequestQuery):RequestProductAction {
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

export const fetchProducts:AsyncAction<RequestQuery, ProductAction> = (query) => {
  return  (dispatch:Dispatch<ProductAction>) => {
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