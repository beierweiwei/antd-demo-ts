import { connect } from 'react-redux'
import CartPage from '../pages/cart'
import { ThunkDispatch } from 'redux-thunk';
import { fetchCart, updateCart } from '../store/reducers/cart'
const mapStateToProps = ({ cart }: StoreState) => {
  return {
    list: cart.list
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    updateCart: (params:any) => dispatch(updateCart(params)),
    getCart: (params: any) => dispatch(fetchCart(params))
  }
}
const CartContainer = connect(mapStateToProps, mapDispatchToProps)(CartPage)
export default CartContainer