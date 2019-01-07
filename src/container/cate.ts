import { connect } from 'react-redux'
import CatePage from '../pages/product/cate'
import { ThunkDispatch } from 'redux-thunk';
import { fetchProductCates } from 'src/store/reducers/cates'
const mapStateToprops = ({ productCates }: StoreState) => {
  return {
    productCates
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    fetchProductCates: () => dispatch(fetchProductCates)
  }
}
const HomePageContainer = connect(mapStateToprops, mapDispatchToProps)(CatePage)
export default HomePageContainer