import { actions } from '../../constants'
import { ThunkAction } from 'redux-thunk'
import { Http } from '../../api'
export interface RequestQuery  {
  pageSize?: number
  curtPage?: number
  filter?: any
}
export type OptionQuery = RequestQuery | null
export interface RequestProductAction {
  type: actions.REQUEST_PRODUCTS
  query?: OptionQuery
  page?: string 
  clear?: boolean 
}


interface ProductListApi {
  list: Product[]
  count: number
}

export interface ReceiveProductsAction  {
  type: actions.RECEIVE_PRODUCTS
  data: ProductListApi
  page?: number 
}


export type ProductAction = RequestProductAction | ReceiveProductsAction

export type AsyncAction<R, S, E, A> = (payload:E, callback?:any) => ThunkAction<R, S, E, any>

export function requestProducts (query: OptionQuery, page?:string):RequestProductAction {
  return {
    type: actions.REQUEST_PRODUCTS,
    query,
    page
  }
}

export function receiveProducts(data:ProductListApi, page?:number): ReceiveProductsAction{
  return {
    type: actions.RECEIVE_PRODUCTS,
    data,
    page
  }
}

export const fetchProducts: AsyncAction<any, StoreState, OptionQuery, RequestProductAction> = (query: RequestQuery) => {
  return  (dispatch, getState) => {
    dispatch(requestProducts(query))
    const state = getState()
    const tempQuery:any = {}
    const { curtPage } = query
  
    tempQuery.pageSize = state.home.products.pageSize
    tempQuery.curtPage = state.home.products.curtPage
  
    return Http.get('product/list', { params: tempQuery})
      .then(
        (res:any) => {
          console.log(res)
          dispatch(receiveProducts(res, curtPage))
        },
        err => console.log(err.message)
      ) 
  }
}