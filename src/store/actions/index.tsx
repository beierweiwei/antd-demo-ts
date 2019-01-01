import { actions } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
import { Product } from '../../types'
import { Dispatch } from 'react';
interface RequestQuery extends AxiosRequestConfig {
  pageSize?: number,
  curtPage?: number,
}
export interface RequestProductAction {
  type: typeof actions.REQUEST_RODUCTS,
  query: RequestQuery
}

export function requestProducts (query: RequestQuery):RequestProductAction {
  return {
    type: actions.REQUEST_RODUCTS,
    query
  }
}

export interface ReceiveProductsAction {
  type: typeof actions.RECEIVE_PRODUCTS,
  data: ProductListApi 
}
export interface ProductListApi {
  list: Product[],
  count: number
}
function receiveProducts(data:ProductListApi): ReceiveProductsAction{
  return {
    type: actions.RECEIVE_PRODUCTS,
    data
  }
}

export type ProductAction = RequestProductAction | ReceiveProductsAction


export function fetchProducts (query:RequestQuery):any {
  return  (dispatch:Dispatch<ProductAction>) => {
    console.log('xxxxxxxxxx')
    dispatch(requestProducts(query))
    return axios.get('http://localhost:8080/api/product/list', {params: query})
      .then(
        res => res.data,
        err => console.log(err.message)
      ).then(res =>
        dispatch(receiveProducts(res))
      )
  }
}