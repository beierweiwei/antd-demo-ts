import * as React from 'react'
import 'index.less'
import ProductItem from './../productItem'
interface ProductListProps {
  [index:string]: any 
}

interface ProductListState {
  [index:string]: any 
}
class ProductList extends React.Component<ProductListProps, ProductListState> {

}

export default ProductList