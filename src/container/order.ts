import { connect } from 'react-redux'
import OrderPage from '../pages/order/list'
import { ThunkDispatch } from 'redux-thunk';
import { fetchOrder } from 'src/store/actions/order'
const mapStateToProps = ({ order }: StoreState) => {
  return {
    order  
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    fetchOrder: (params: any) => dispatch(fetchOrder(params))
  }
}
const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(OrderPage)
export default HomePageContainer