import { connect } from 'react-redux'
import HomePage from '../pages/home'
import { fetchProducts, OptionQuery } from '../store/actions'
import { ThunkDispatch } from 'redux-thunk';
import { fetchAds } from 'src/store/reducers/ads';
const mapStateToprops = ({home}:StoreState) => {
    return {
      ...home
    }
}
const mapDispatchToProps = (dispatch:ThunkDispatch<any, any, any>) => {
    return {
        fetchProducts: (query:OptionQuery) => dispatch(fetchProducts(query, 'home')),
        fetchAds:(query:any) => dispatch(fetchAds(query, 'home')),
    }
}
const HomePageContainer = connect(mapStateToprops, mapDispatchToProps)(HomePage)
export default HomePageContainer