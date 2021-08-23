import React from 'react'
import BaseContainer from '../base/baseContainer';
import ProductList from '../productList';
import OrderProductItem from '../orderProductItem'
import { ShopItem } from 'src/pages/statement/types';
import './index.less'
export default function OrderShopItem(props: ShopItem) {
  const {shop , productList = []} = props 
  const prefixCls = 'order-shop-item'
  return (
    <div className={`${prefixCls}`}>
      <BaseContainer
        renderHeader={<div className="shop-celler">{shop.name}</div>}
      >
        {productList.map(product => (
          <OrderProductItem key={product._id} {...product}/>
      ))}
      </BaseContainer>
    </div>
  )
}
