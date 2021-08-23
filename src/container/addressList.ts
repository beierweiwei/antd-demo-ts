import { connect } from 'react-redux'
import AddressList from '../pages/address/list'

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
//   return {
//     postLogin: (params: any) => dispatch(postLogin(params)),
//   }
// }
const mapStateToprops = ({ user }: StoreState) => {
  return {
    addressList: user.user && user.user.address
  }
}
export default connect(mapStateToprops)(AddressList)