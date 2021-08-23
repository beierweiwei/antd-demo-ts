import React, { Component, Dispatch } from 'react'
import OrderItem from 'src/components/orderItem';
import { Tabs } from 'antd-mobile';
import { Http } from 'src/api';
import { ORDER } from 'src/api/api';
import { ShopItem } from 'src/pages/statement/types';
interface OrderListPageProps {
  order: OrderState
  fetchOrder: any
}
export default class OrderList extends Component<OrderListPageProps> {
  constructor(props: OrderListPageProps) {
    super(props)
  }
  componentDidMount () {
    // Http.get(ORDER).then(({total, data}:any) => {
    //   this.setState({total, data})
    // })
    console.log(this.props)
    this.props.fetchOrder({})
  }
  render() {
    const { list } = this.props.order || []
    const prefixCls = 'order-list'
    const tabs = [
      { title: '待付款' },
      { title: '待收货' },
      { title: '退换' }
    ];
    return (
      <div>
        <Tabs tabs={tabs} 
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            {
              list && list.map((orderItem: OrderItem) => <OrderItem {...orderItem} key={orderItem._id}/>)
            }
        </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of second tab
        </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of third tab
        </div>
        </Tabs>
        
      </div>
    )
  }
}
