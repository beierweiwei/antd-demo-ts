import React from 'react'
import './index.less'
import { Link } from 'react-router-dom';
export default function OrderProductItem (props: OrderProductItem) {
  const prefix = 'order-product-item'
  return (
    <div className={`${prefix}`}>
      <div className={`${prefix}-wrap`}>
        <div className={`${prefix}-img`}>
          <Link to={`/product/detail/${props._id}`}>
            <img src={props.thumbPic.toString()} alt={props.title} />
          </Link>
        </div>
        <div className={`${prefix}-body`}>
          <div className={`${prefix}-title`}>
            {props.title}
          </div>
          <div className={`${prefix}-attr`}>
            {props.propItems}
          </div>
        </div>
        <div className={`${prefix}-number`}>
          <div className={`${prefix}-price`}><span className={`${prefix}-price-num shop-price`}>{props.price}</span></div>
          <div className={`${prefix}-count`}> x{props.buyNum}</div>
        </div>
      </div>
    </div>
  )
}
