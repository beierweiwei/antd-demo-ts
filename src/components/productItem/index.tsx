import * as React from 'react'
import './index.less'

const ProductItem = (props:Product) => {
  const prefix = 'product-item'
  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}-img`}>
        <img src={props.thumbPic[0]} alt={props.title}/>
      </div>
      <div className={`${prefix}-bottom`}>
        <div className={`${prefix}-title`}>
          {props.title}
        </div>
        <div className={`${prefix}-sub`}>
          <span className={`${prefix}-price`}><span className={`${prefix}-price-icon`}>¥</span><span className={`${prefix}-price-num`}>{props.price}</span></span>
          <span className={`${prefix}-sales`}>销量：{props.saleNum}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem