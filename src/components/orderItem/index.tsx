import React from 'react'
import BaseContainer from '../base/baseContainer';
// import ProductList from '../productList';
import OrderProductItem from '../orderProductItem'
export default function index(props:OrderItem) {
  const { products = []} = props 
  return (
    <div>
      <BaseContainer
        renderHeader="shop商城"
      >
        {products.map((product:any) => (
        <OrderProductItem {...product}/>
      ))}
      </BaseContainer>
    </div>
  )
}
