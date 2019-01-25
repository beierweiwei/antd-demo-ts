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
  componentDidMount() {
    console.log('mount')
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

export default ProudctListPage