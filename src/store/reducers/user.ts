import { SAVE_USER, CLEAR_USER } from "src/constants/actions";

const defaultUserState = {
    isLogin: false,
    user: null
}
export default function user (state=defaultUserState, action:any) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user,
        isLogin: true  
      }
    case CLEAR_USER: 
      return {
        ...state,
        user: null,
        isLogin: false
      }
    default:
      return state 
  }
}