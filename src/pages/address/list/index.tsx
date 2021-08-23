import React, { Component } from 'react'
import { Http } from 'src/api';
import { ADDRESS } from 'src/api/api';
import AddressItem from 'src/container/addressItem';
import { withRouter } from 'react-router';
import qs from 'qs';
interface AddressListState {
  selectedId: string 
}
class AddressList extends Component<any, AddressListState>{
  constructor(props: any) {
    super(props)
    this.state = {
      selectedId: ''
    }
  }
  componentWillMount () {
    const query = qs.parse(this.props.location.search.slice(1))
    const { selectedId } = query 
    // tslint:disable-next-line:no-unused-expression
    selectedId && this.setState({selectedId})
  }
  onPick = (addrId:string) => {
    console.log(addrId)
    const id = this.state.selectedId === addrId ? '' : addrId
    this.setState({selectedId: id})
  }
  render() {
    const { addressList } = this.props 
    const { selectedId } = this.state
    return (
      <div>
        {addressList && addressList.map((addr:AddressItem) => <AddressItem {...addr} checked={selectedId === addr._id} onPick={this.onPick} key={addr._id}/>)}
      </div>
    )
  }
}
export default withRouter(AddressList)