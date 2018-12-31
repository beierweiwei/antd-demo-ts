import * as React from 'react'
import './index.less'
export interface ProductProps  {
  title: string,
  thumb: string,
  price: number,
  unit: string,
  sales: number,
  _id: string
}
const ProductItem = (props:ProductProps) => {
  const prefix = 'product-item'
  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}-img`}>
        <img src={props.thumb} alt={props.thumb}/>
        <div className={`${props.title}`}>
          {props.title}
        </div>
        <div className={`${prefix}-sub`}>
          <span className={`${prefix}-sales`}>{props.sales}</span>
          <span className={`${prefix}-price`}>{props.price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem