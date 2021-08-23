

interface QueryListParams {
  pageSize: number  
  curtPage: number 
}
interface OrderState {
  list: OrderItem[],
  params: QueryListParams,
  count: number 
}
interface StoreState {
  products: ProductState
  productCates: ProductCateState
  home: HomeState
  user: UserState
  system: SystemState
  order: OrderState
  cart: CartStoreState
}
