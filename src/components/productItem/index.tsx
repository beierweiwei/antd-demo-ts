import * as React from 'react'
import './index.less'
import { Link } from 'react-router-dom';

const ProductItem = (props:Product) => {
  const prefix = 'product-item'
  return (
    <div className={`${prefix}`}>
      <Link to={`/product/detail/${props._id}`}> 
        <div className={`${prefix}-img`}>
          <img src={props.thumbPic && props.thumbPic[0]} alt={props.title}/>
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
      </Link>
    </div>
  )
}

export default ProductItem