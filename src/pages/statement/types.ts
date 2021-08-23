import { totalmem } from 'os';

export interface ShopItem {
  shop: {
    name: string
    _id: string
  }
  productList: OrderProductItem[]
}
export interface StatementSate {
  orderId: string 
  address?: AddressItem
  shopList?: ShopItem[]
  coupons?: Coupon[]
  selectedCouponId: string | undefined
  delivery: {} 
  total: number 
  productNum: number
  isShowPayModal: boolean
}