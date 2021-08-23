interface OrderItem {
    _id: string,
    orderNo: string
    status: number // 0: 未支付 1: 代发货 2: 待收货 3: 已完成 4: 申请退货中 5: 退货中
    ctime: Date
    address: AddressItem
    user: UserItemState
    products: Product[]
    nums: number[]
    discounttotal: number
    discount_projects: any[]
    trak: {
      no: string
      company: string
      freight: number // 运费
    },
    total: number
    changes?: string[]
}
interface OrderProductItem extends Product {
  buyNum: number
  propItems: string
}