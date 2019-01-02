import { connect } from 'react-redux'
import HomePage from '../pages/home'
import { fetchProducts, requestProducts, OptionQuery } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
const mapStateToprops = ({products}:StoreState) => {
    return {
      products   
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<any, any, any>) => {
    return {
        fetchProducts: (query:OptionQuery) => dispatch(fetchProducts(query)),
        requestProducts: (query:OptionQuery) => dispatch(requestProducts(query))
    }
}
const HomePageContainer = connect(mapStateToprops, mapDispatchToProps)(HomePage)
export default HomePageContainer