import { connect } from 'react-redux'
import ProductListPage from '../pages/product/list'
import { fetchProducts, OptionQuery } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
const mapStateToProps = ({ products }: StoreState) => {
  return {
    products
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    fetchProducts: (query: OptionQuery) => dispatch(fetchProducts(query, 'productList')),
  }
}
const ProductListPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
export default ProductListPageContainer
