import React from 'react'
import { Result, Icon } from 'antd-mobile';
import { withRouter } from 'react-router';
import qs from 'qs';
function success(props: any) {
  const location = props.location
  const prefixCls = 'pay_result'
  const queryObj = qs.parse(location.search.slice(1) || '')

  return (
    <div className={`${prefixCls}`}>
      <Result
        img={<Icon type="check-circle" className={`${prefixCls}-icon`} />}
        title="支付成功"
        message={<div><p>{queryObj.money}元</p><p onClick={() => props.history.push('/order/' + queryObj.orderId )}>查看订单</p></div>}
      />
    </div>
  )
}
export default withRouter(success)