
export interface Product {
    title: string,
    thumbs: string[],
    desc: string,
    unit: string,
    sales: number,
    price: number
}
export interface ProductState {
    isLoading: boolean,
    curtPage: number,
    pageSize: number,
    list: Product[]
  }

export interface StoreState {
    products: ProductState
} 