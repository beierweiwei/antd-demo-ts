import * as React from 'react'
import ProductList from '../../../components/productList'
import { ThunkAction } from 'redux-thunk'


// interface ProductListPageProps extends ProductListPage {
// }

class ProductListPage extends React.Component<any> {
  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchProducts({pageSize: 2, curtPage: 0})
  }
  render () {
    return (
      <div>
        <ProductList products={this.props.products} fetchProducts={this.props.fetchProducts} />
      </div>
    )
  }
}

export default ProductListPage