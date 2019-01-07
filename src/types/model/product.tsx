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
  isAllLoaded: boolean
  count: number
}

interface ProductCateState {
  data: ProductCate[]
}

interface ProductCate {
  _id: string 
  level: number
  name: string 
  pid: string | null
  sort: number 
  field: string 
  props: any[]
}