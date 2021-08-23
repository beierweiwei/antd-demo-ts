import { ThunkAction } from 'redux-thunk';
import { Http } from 'src/api';
import { ADDRESS } from 'src/api/api';
import { getUserInfo } from './user';

export const updateAddress = (params: AddressItem): ThunkAction<any, StoreState, any, any> =>
  (dispatch, getState) =>
    Http.post<AddressItem>(ADDRESS + params._id, params).then(() => dispatch(getUserInfo))

export const deleteAddress = (params: AddressItem): ThunkAction<any, StoreState, any, any> =>
  (dispatch, getState) =>
    Http.post<AddressItem>(ADDRESS + 'delete/' + params._id, params).then(() => dispatch(getUserInfo))

export const createAddress = (params: AddressItem): ThunkAction<any, StoreState, any, any> =>
  (dispatch, getState) =>
    Http.post<AddressItem>(ADDRESS, params).then(() => dispatch(getUserInfo))

export interface AddressAction {
  updateAddress: typeof updateAddress 
  deleteAddress: typeof deleteAddress
  createAddress: typeof createAddress
}