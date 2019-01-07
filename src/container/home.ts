import { connect } from 'react-redux'
import HomePage from '../pages/home'
import { fetchProducts, requestProducts, OptionQuery } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
import { fetchAds } from 'src/store/reducers/ads';
const mapStateToprops = ({products, ads}:StoreState) => {
    return {
      products,
      ads  
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<any, any, any>) => {
    return {
        fetchProducts: (query:OptionQuery) => dispatch(fetchProducts(query)),
        fetchAds:() => dispatch(fetchAds),
        requestProducts: (query:OptionQuery) => dispatch(requestProducts(query)),
    }
}
const HomePageContainer = connect(mapStateToprops, mapDispatchToProps)(HomePage)
export default HomePageContainer