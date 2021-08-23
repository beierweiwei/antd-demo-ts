import { SAVE_USER, CLEAR_USER, CHECK_LOGIN } from "src/constants/actions";
import { ThunkAction } from 'redux-thunk';
import { Http, API } from 'src/api';
import Cookie from 'src/utils/cookie';
import { GET_USER_INFO } from 'src/api/api';

// login 
export const saveUser = (user:UserItemState) => {
  return {
    type: SAVE_USER,
    user 
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER
  }
}

export const checkLogin = () => {
  return {
    type: CHECK_LOGIN
  }
}

export const postLogin = (params:object):ThunkAction<any, StoreState, any, any> => 
  (dispatch, getState) => 
    Http.post<UserItemState>(API.LOGIN, params).then((user => { 
      dispatch(saveUser(user))
      Cookie.set('user', JSON.stringify(user))
    }))
export const getUserInfo: ThunkAction<any, any, any, any> = (dispatch, getState) =>
  Http.get<UserItemState>(GET_USER_INFO).then(((user) => {
      dispatch(saveUser(user))
      Cookie.set('user', JSON.stringify(user))
    }))

export interface UserAction  {
  postLogin: typeof postLogin
  getUserInfo: typeof getUserInfo
  saveUser: typeof saveUser 
  clearUser: typeof clearUser 
  checkLogin: typeof checkLogin
}