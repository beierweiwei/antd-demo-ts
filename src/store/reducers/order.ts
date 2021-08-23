import { SAVE_ORDER, REQUEST_ORDER } from 'src/constants/actions';

const defaultOrderState = {
  params: {
    pageSize: 10,
    curtPage: 1
  },
  list: [],
  count: 0
}
export default function order(state=defaultOrderState, action: any) {
  switch (action.type) {
    case SAVE_ORDER:
      return {
        ...state,
        list: [
          ...state.list,
          ...action.data
        ]
      }
    case REQUEST_ORDER:
      return {
        ...state,
        params: {
          ...state.params,
          ...action.params
        }
      }
    default:
      return state
  }
}