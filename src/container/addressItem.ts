import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import AddressItem from '../components/addressItem'
import { updateAddress, deleteAddress, createAddress } from '../store/actions/address'
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    updateAddress: (params:AddressItem) => dispatch(updateAddress(params)),
    deleteAddress: (params:AddressItem) => dispatch(deleteAddress(params)),
    createAddress: (params:AddressItem) => dispatch(createAddress(params))
  } 
}
export default connect(null, mapDispatchToProps)(AddressItem)