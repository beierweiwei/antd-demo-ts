import { actions } from '../../constants'
import axios, { AxiosRequestConfig } from 'axios'
import { Dispatch } from 'react';
interface RequestQuery extends AxiosRequestConfig {
  pageSize?: number,
  curtPage?: number,
}
export function requestProducts (query: RequestQuery) {
  return {
    type: actions.REQUEST_RODUCTS,
    query
  }
}

function receiveProducts(data:any) {
  return {
    type: actions.RECEIVE_PRODUCTS,
    data
  }
}
export function fetchProducts (query:RequestQuery) {
  return  (dispatch: Dispatch<object>) => {
    dispatch(requestProducts(query))
    // disable non-arrow
    return axios.get('http://localhost:8080/api/product', query)
      .then(
        res => res.data,
        err => console.log(err.message)
      ).then(res =>
        dispatch(receiveProducts(res))
      )
  }
}