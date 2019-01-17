import { connect } from 'react-redux'
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
 