interface Activity {
  title: string
  thumb: string
  desc: string
  coupons: any[]
  startTime: string
  endTime: string
  status: number
  _id: string 
}
interface ActivitiesState {
  list: Activity[]
  count: number
}