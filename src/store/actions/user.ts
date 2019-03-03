import { SAVE_USER, CLEAR_USER, CHECK_LOGIN } from "src/constants/actions";
import { ThunkAction } from 'redux-thunk';
import { Http, API } from 'src/api';

// login 
const saveUser = (user:User) => {
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
    Http.post<User>(API.LOGIN, params).then((user => dispatch(saveUser(user))))
