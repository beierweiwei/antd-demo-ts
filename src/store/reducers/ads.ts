import { actions } from '../../constants'
// import { AsyncAction } from '../actions'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

interface ReceiveAds extends Action<actions.RECEIVE_ADS> {
  data: ActivitiesState
}

// Actions
export const fetchAds: ThunkAction<any, any, any, any> = (disPatch, getSate) => {
  axios.get('http://localhost:8080/api/activity', {params: {pageSize: 4, curtPage: 1}})
    .then(
      res => res.data.data,
      err => console.log(err.message)
    ).then(
      res => disPatch(receiveAds(res))
    )
}

const receiveAds = (data: ActivitiesState): ReceiveAds => {
  return {
    type: actions.RECEIVE_ADS,
    data 
  }
}
// reducers 

// type AdsReducer = (ActivitiesState, any) => ActivitiesState
export default function ads(state: ActivitiesState = 
  {
    count: 3,
    list: []
  },
  action: ReceiveAds) {
  switch (action.type) {
    case actions.RECEIVE_ADS:
    const res = action.data
      return {
        ...state,
        list: res.list 
      }
    default:
      return state
  }
}