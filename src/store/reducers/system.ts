import { SET_SYSTEM, SET_TITLE } from 'src/constants/actions';

const system = (
  state = {
    title: '',
    v:'1.0',
  },
  action: any  
):SystemState => {
  switch (action.type) {
    case SET_SYSTEM :
      return {
        ...state,
        ...action.info
      }
    case SET_TITLE: 
      return {
        ...state,
        title: action.title 
      }
    default:
      return state 
  }
}

export default system 