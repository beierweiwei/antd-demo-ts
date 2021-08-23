import React, { Component } from 'react'
import ProductList from 'src/components/productList';
import AddressDefaultCard from 'src/components/addressDefaultCard';
import { Http } from 'src/api';
import { ORDER } from 'src/api/api';
import { withRouter } from 'react-router';
import formatDateTime from 'src/utils/formatDateTime';
import OrderShopItem from './../../../components/orderShopItem'
import './index.less'
import { WhiteSpace } from 'antd-mobile';
interface OrderDetailState {
  _id?: string 
  orderNo?: string
  status?: number  // 0: 未支付 1: 代发货 2: 待收货 3: 已完成 4: 申请退货中 5: 退货中
  ctime?: string
  address?: AddressItem
  user?: UserItemState
  products?: OrderProductItem[]
  nums?: number[]
  discounttotal?: number,
  discount_projects: any[],
  trak?: {
    no: string
    company: string
    freight: number // 运费
  },
  total?: number
  changes?: []
}

class OrderDetail extends Component<any, any> {
  constructor (props:any) {
    super(props)
    this.state = {
      
    }
  }
  componentWillMount () {
    this.setState({ _id: this.props.match.params.id})
    setTimeout(() => this.getOrderDetail())
  }
  getOrderDetail () {
    Http.get(ORDER + this.state._id).then(res => this.setState({...res}))
  }
  render() {
    const { orderNo, ctime, address, products, nums} = this.state
    const shopList = [{shop: {_id: '0', name: 'myshop 官方旗舰店'}, productList: products}]
    const fctime = ctime ? formatDateTime(ctime, 'yyyy-MM-dd hh:mm:ss') : ''
    const prefixCls = 'order_detail'
    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-info shop-container`}>
          <h3>订单信息</h3>
          <div className="shop-celler">
            <span> 订单编号：</span>
            <span>{orderNo}</span>
          </div>
          <div className="shop-celler">
            <span> 支付流水号：</span>
            <span>{}</span>
          </div>
          <div className="shop-celler">
            <span> 创建时间：</span>
            <span>{fctime}</span>
          </div>
        </div>
        <WhiteSpace/>
        <AddressDefaultCard {...address}/>
        <WhiteSpace />
        {
          shopList && shopList.map(shop => (
            <OrderShopItem key={shop.shop._id} {...shop} />
          ))
        }
      </div>
    )
  }
}
export default withRouter(OrderDetail)