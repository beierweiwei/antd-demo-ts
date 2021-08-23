import React from 'react';
import { Link } from 'react-router-dom';
import { Stepper } from 'antd-mobile';
import classnames from 'classnames';


const prefix = 'cart-item'
class CartItem extends React.Component<CartItemProps, CartItemState> {
  constructor(props: CartItemProps) {
    super(props)
    this.state = {
      num: props.num || 0,
    }
    this.onNumberChange = this.onNumberChange.bind(this)
  }
  render() {
    const props = this.props
    const { isEdit } = props 
    // tslint:disable-next-line:prefer-const
    let { num } = this.state
    return <div className={`${prefix}`}>
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
            规格：{props.propItems}
          </div>
        </div>
        <div className={`${prefix}-number`}>
          <div className={`${prefix}-price`}><span className={`${prefix}-price-num shop-price`}>{props.price}</span></div>
          <div className={classnames([`${prefix}-count`, isEdit ? `${prefix}-count_edit` : ''])}>
            {!isEdit ? `x ${num}` : <Stepper
              value={num}
              max={99}
              min={0}
              showNumber={true}
              onChange={this.onNumberChange}
            />}</div>
        </div>
      </div>
    </div>
  }
  onNumberChange(num: number): void {
    this.setState({ num })
  }
}
export default CartItem