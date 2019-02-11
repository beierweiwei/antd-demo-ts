import { connect } from 'react-redux'
<<<<<<< HEAD
import { fetchProducts, OptionQuery } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
import ProductListPage from 'src/pages/product/list';
const mapStateToprops = ({productList}:StoreState) => {
    return {
        ...productList
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<any, any, any>) => {
    return {
        fetchProducts: (query:OptionQuery) => dispatch(fetchProducts(query, 'productList')),
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(ProductListPage)
 
=======
import ProductListPage from '../pages/product/list'
import { fetchProducts, OptionQuery } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
const mapStateToprops = ({ productList }: StoreState) => {
  return {
    ...productList
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    fetchProducts: (query: OptionQuery) => dispatch(fetchProducts(query, 'productList')),
  }
}
const ProductListPageContainer = connect(mapStateToprops, mapDispatchToProps)(ProductListPage)
export default ProductListPageContainer
>>>>>>> 87ad1340d0d216bb175a10a7a1764f07bc58508f
