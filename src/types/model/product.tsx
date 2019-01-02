interface Product {
  title: string
  thumbPic: string[]
  des: string
  unit: string
  saleNum: number
  price: number
  props: []
  isSale: number
  cateId: object
  subProds:[]
  _id: string
}
interface ProductState {
  isLoading: boolean
  curtPage: number
  pageSize: number
  list: Product[]
}