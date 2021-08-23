interface Coupon {
  type: number // 优惠券类型。1 平台通用券 2 活动优惠券
  statue: number 
  title: string 
  desc: string 
  full: number 
  reduce: number 
  activities: []
  startTime: Date 
  endTime: Date 
}