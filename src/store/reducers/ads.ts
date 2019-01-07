import { actions } from '../../constants'
// import { AsyncAction } from '../actions'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Http } from '../../api/index'

interface ReceiveAds extends Action<actions.RECEIVE_ADS> {
  data: ActivitiesState
}

// Actions
export const fetchAds: ThunkAction<any, any, any, any> = (disPatch, getSate) => {
  Http.get('/activity', {params: {pageSize: 4, curtPage: 1}})
    .then(
      (res:any) => disPatch(receiveAds(res)),
      err => console.log(err.message)
    ).then(
      
    )
}

const receiveAds = (data: ActivitiesState = {list: [], count: 0}): ReceiveAds => {
  return {
    type: actions.RECEIVE_ADS,
    data 
  }
}
// reducers 

// type AdsReducer = (ActivitiesState, any) => ActivitiesState
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