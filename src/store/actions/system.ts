import { SET_SYSTEM, SET_TITLE } from "src/constants/actions";
import { Action } from 'redux';

export interface SetSystemAction extends Action{
  info: SystemState
}
export const setSystemAction = (info:SystemState) => {
  return {
    type: SET_SYSTEM,
    info 
  }
}

export const setTitleAction = (title:string) => ({
  type: SET_TITLE,
  title 
})
