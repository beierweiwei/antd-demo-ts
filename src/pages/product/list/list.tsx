import * as React from 'react'
// import ProductList from '../../../components/productList'
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
  render () {
    return (
      <div>
        {/* <ProductList></ProductList> */}
      </div>
    )
  }
}

export default ProudctListPage