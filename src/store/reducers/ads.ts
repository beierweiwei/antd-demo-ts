import { actions } from '../../constants'
// import { AsyncAction } from '../actions'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Http } from '../../api/index'

export interface ReceiveAds extends Action<actions.RECEIVE_ADS> {
  data: ActivitiesState,
  page?: string 
}

// Actions
export const fetchAds = (query: any, page?: string): (ThunkAction<any, any, any, any>)  => { 
  return (disPatch, getSate) => {
  Http.get('/activity', {params: query})
    .then(
      (res:any) => {
        disPatch(receiveAds(res, page))
      },
      (err:Error) => console.log(err.message)
    )
  } 
}


export const receiveAds = (data = {list: [], count: 0}, page = ''): ReceiveAds => {
  return {
    type: actions.RECEIVE_ADS,
    data,
    page
  }
}
// reducers 

export default function ads(state: ActivitiesState = 
  {
    count: 0,
    list: []
  },
  action: ReceiveAds) {
  switch (action.type) {
    case actions.RECEIVE_ADS:
    const res = action.data
      return {
        ...state,
        list: res.list,
        count: res.count
      }
    default:
      return state
  }
}