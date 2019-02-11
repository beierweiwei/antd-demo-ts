import * as React from 'react'
import ProductList from '../../../components/productList'
interface ProudctListPageProps {
  [index:string]: any 
}

interface ProudctListPageState {
  [index:string]: any 
}

class ProudctListPage extends React.Component<ProudctListPageProps, ProudctListPageState> {
  constructor (props: ProudctListPageProps) {
    super(props)
  }
<<<<<<< HEAD:src/pages/product/list/index.tsx
  
  render () {
    return (
      <div>
        <ProductList 
          products={this.props.products} 
          fetchProducts={this.props.fetchProducts}
          bannerData={this.props.banerData}  
        />
=======
  componentDidMount() {
    console.log('mount')
    this.props.fetchProducts({pageSize: 2, curtPage: 0})
  }
  render () {
    return (
      <div>
        <ProductList products={this.props.products} fetchProducts={this.props.fetchProducts} />
>>>>>>> 87ad1340d0d216bb175a10a7a1764f07bc58508f:src/pages/product/list/index.tsx
      </div>
    )
  }
}

export default ProudctListPage