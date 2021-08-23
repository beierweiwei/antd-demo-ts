import React from 'react'
import { List, Radio, Button, Checkbox } from 'antd-mobile';
import { withRouter } from 'react-router';
import './index.less'
import { ADDRESS } from 'src/api/api';

function AddressItem(props:any) {
  const { tel, name, areaName, detail, areaCode, checked, _id, history, isDef, user, updateAddress, deleteAddress, onPick} = props
  const addressObj = { tel, name, areaName, detail, _id, areaCode, user, isDef}
  const prefixCls = 'address_item'
  const handelClickFor = (type:string) => {
    switch(type) {
      case 'def':
        updateAddress({...addressObj, isDef: 1})
        break
      case 'edit':
        history.push('/address?id=' + _id)
        break
      case 'delete':
        deleteAddress(addressObj)
        break
      default:
        return
    }
  }
  return (
    <List.Item
      thumb={(<Checkbox checked={checked} onChange={(e) => onPick(_id)}/>)}
      wrap={true}
      className={`${prefixCls}`}
    >
      <div className={`${prefixCls}-wrap`}>
        <div className={`${prefixCls}-receiver`}>
          <span className={`${prefixCls}-receiver_name`}>{name}</span>
          <span className={`${prefixCls}-receiver_tel`}>{tel}</span>
        </div>
        <div className={`${prefixCls}-address`}>
          {areaName + ',' + detail}
        </div>
        <div className={`${prefixCls}-footer`}>
          <Button size="small" disabled={isDef} onClick={() => handelClickFor('def')}>设为默认</Button>
          <Button size="small" onClick={() => handelClickFor('edit')}>编辑</Button>
          <Button size="small" onClick={() => handelClickFor('delete')}>删除</Button>
        </div>
      </div>
    </List.Item>
  )
}

export default withRouter(AddressItem)
