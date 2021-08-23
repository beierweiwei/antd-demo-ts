import React from 'react'
import { Card, Flex, List } from 'antd-mobile';
import './index.less';
import { RouteComponentProps, withRouter } from 'react-router';
const prefixCls = 'address_default_card'

function AddressDefaultCard(props:AddressItem & RouteComponentProps) {
  const {tel, name, areaName, detail, _id} = props 
  return (
      <List.Item
      thumb={(<i className="iconfont icon-shouhuodizhi"/>)}
      arrow="horizontal"
      wrap={true}
      onClick={() => props.history.push('/address/list?selectedId=' + _id)}
      >
      <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-receiver`}>
            <span className={`${prefixCls}-receiver_name`}>{name}</span>
            <span className={`${prefixCls}-receiver_tel`}>{tel}</span>
          </div>
          <div className={`${prefixCls}-address`}>
            {areaName + ',' + detail}
          </div>
        </div>
      </List.Item>
    )
}
// TODO sdf
export default withRouter(AddressDefaultCard)
