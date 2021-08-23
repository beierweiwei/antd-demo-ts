import React, { Component } from 'react'
import { List, InputItem, Button, WhiteSpace, Popover, Toast } from 'antd-mobile';
import AddressDefaultCard from 'src/components/addressDefaultCard';
import OrderShopItem from 'src/components/orderShopItem'
import { StatementSate } from './types';
import { Http } from 'src/api';
import { CREATE_STATEMENT, ADDRESS, ORDER } from 'src/api/api';
import { withRouter } from 'react-router';
import qs from 'qs';
import './index.less';
import Payment from 'src/components/payment';
const prefixCls = 'statement'
class Statement extends Component<any, StatementSate>{
  constructor(props:any) {
    super(props)
    this.state = {
      address: undefined,
      shopList: undefined,
      coupons: undefined,
      selectedCouponId: '',
      delivery: {},
      total: 0,
      productNum: 0,
      isShowPayModal: false,
      orderId: ''
    }
  }

  componentWillMount() {
    // get url query 
    const { location } = this.props 
    const query = location.search && location.search.split('?')[1]
    const queryObj = qs.parse(query)
    console.log(location.search)
    Http.post(CREATE_STATEMENT, queryObj).then(res => {
      const { products = [], shopList, total = 0} = res
      const list = shopList ? shopList : [{shop: {name: 'myshop 官方旗舰店', _id: '0'} , productList: products }]
      this.setState({shopList: list, total})
    })
    this.getAddressList()
  }
  getAddressList = () => {
    Http.get(ADDRESS).then((res:AddressItem[]) => {
      // tslint:disable-next-line:no-unused-expression
      res && res.length > 0 && this.setState({address: res.find((adr) => !!adr.isDef)})
    })
  }
  goTo = (path:string) => {
    this.props.history.push(path)
  }
  // create order 
  createOrder = () => {
    const { address, productNum, shopList = [], selectedCouponId} = this.state
    const productIds:string[] = [] 
    const nums:number[] = []
    shopList.forEach(shopItem => shopItem.productList.forEach(productItem => productIds.push(productItem._id) && nums.push(productItem.buyNum)))
    const params = {
      productIds,
      nums,
      address: address && address._id,
    }

    Http.post(ORDER, params).then(res => {
      this.setState({orderId: res._id})
      // success, next 
      this.invokePayModal()
    }, err => {
      Toast.fail('生成订单失败！')
    })
  }
  // post pay 

  invokePayModal = () => {
    this.setState({isShowPayModal: true})
  }
  paySuccess = () => {
    Toast.success('支付成功！')
    this.props.history.replace('/pay/success?money=' + this.state.total + '&orderId=' + this.state.orderId)
    console.log('success')
  }
  payFail = () => {
    Toast.fail('支付失败！')
    this.props.history.replace('/pay/fail?orderId=' + this.state.orderId )
    console.log('fail')
  }
  onClosePayModal = () => {
    this.setState({ isShowPayModal: false})
  }
  render() {
    const { orderId, address, total, shopList, coupons, selectedCouponId, delivery, productNum, isShowPayModal } = this.state
    const couponFilted = coupons && coupons.filter(item => item)[0]
    const resTotal = total
    return (
      <div className={`${prefixCls}`}>
        {address ? <AddressDefaultCard  {...address} /> : <Button onClick={() => this.goTo('/address')}>新增地址</Button>}
        {
          shopList && shopList.map(shop => (
            <OrderShopItem key={shop.shop._id} {...shop} />
          ))
        }
        <div className={`${prefixCls}-extra`}>
          <div className={`${prefixCls}-delivery`}>
            {/* <span>配送方式：{delivery}</span> */}
            <span>{}</span>
          </div>
          <div className={`${prefixCls}-comment shop-cell`}>
            <span>订单备注：</span>
            <div className={`${prefixCls}-comment-input`}>
              <InputItem placeholder="选填，和先商家协商一致" />
            </div>
            
          </div>
          <div className={`${prefixCls}-total shop-cell`}>
            <span>共{productNum}件</span>
            <span>小计： <span className="shop-price">{total}</span></span>
          </div>
        </div>
        <WhiteSpace/>
        <List>
          <List.Item 
            extra={!!couponFilted && `减${couponFilted.reduce}元`}
            arrow="horizontal"
          >
            使用优惠券
          </List.Item>
        </List>
        <div className={`${prefixCls}-count-bar`}>
          <div className={`${prefixCls}-res-total`}>
            <span>总金额:</span>
            <span className={`${prefixCls}-total_number shop-price`}>{resTotal}</span>
          </div>
          <div className={`${prefixCls}-submit`} onClick={this.createOrder}>提交订单</div>
        </div>
        <Payment
          orderId={orderId}
          isShow={isShowPayModal}
          success={this.paySuccess}
          fail={this.payFail}
          onClose={this.onClosePayModal}
        />
      </div>
    )
  }
}

export default withRouter(Statement)
