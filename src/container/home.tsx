import { connect } from 'react-redux'
import HomePage from '../pages/home'
import { StoreState } from '../types'
import { fetchProducts } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
const mapStateToprops = ({products}:StoreState) => {
    return {
      products   
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<any, any, any>) => {
    return {
        fetchProducts: () => dispatch(fetchProducts({pageSize: 10, curtPage: 1}))
    }
}
const HomePageContainer = connect(mapStateToprops, mapDispatchToProps)(HomePage)
export default HomePageContainer