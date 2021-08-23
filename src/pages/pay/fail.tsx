import React from 'react'
import { Result, Icon } from 'antd-mobile';
import { withRouter } from 'react-router';
import qs from 'qs';
function fail(props:any) {
  const location = props.location 
  const prefixCls = 'pay_result'
  const queryObj = qs.parse(location.search.slice(1)|| '')
  
  return (
    <div className={`${prefixCls}`}>
      <Result
        img={<Icon type="cross-circle-o" className={`${prefixCls}-icon`} />}
        title="支付失败"
        message={<div onClick={() => props.history.push('/order/' + queryObj.orderId)}>返回订单详情，继续支付</div>}
      />
    </div>
  )
}
export default withRouter(fail)
