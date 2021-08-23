import React from 'react'
import { List, Checkbox, Flex } from 'antd-mobile';
import BottomNav from '../../components/loayout/bottomNav'
import CartItem from '../../components/cartItem'
import './index.less'
import classnames from 'classnames'
// interface CartProps {
//   list: OrderProductItem[]
//   total: number
//   isEdit: boolean
//   selectedIds: string[]
//   oldList: OrderProductItem[]
// }

const AgreeItem = Checkbox.AgreeItem;
class Cart extends React.Component<any, CartState> {
  constructor(cartProps: any) {
    super(cartProps)
    this.state = {
      isEdit: false,
      isCheckAll: false,
    }
    this.onCheckAll = this.onCheckAll.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onSubmitCart = this.onSubmitCart.bind(this)
    this.onCartCancel = this.onCartCancel.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.calculateSum = this.calculateSum.bind(this)
  }
  componentWillMount() {
    this.props.getCart()
  }
  onCheckAll(e: any) {
    // e.preventDefault();
    this.setState({
      isCheckAll: e.target && e.target.checked
    })

  }
  onEdit() {
    this.setState({
      isEdit: true
    })
  }
  onSubmitCart() {
    this.setState({ isEdit: false })
  }
  onCartCancel() {
    this.setState({ isEdit: false })

  }
  onDelete() {
    console.log('delte')
  }
  calculateSum() {
    console.log('calculateSum')
  }
  render() {
    const { list } = this.props
    const { isCheckAll, isEdit } = this.state
    const prefixCls = 'shop-cart'
    const headerCls = `${prefixCls}__header`
    const listCls = classnames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list_edit`]: isEdit
    })
    const countCls = `${prefixCls}-count`
    const bottomCls = `${prefixCls}__bottom`
    const sumMoney = 0
    const sumNum = 0
    return (<div className={prefixCls}>
      <div className={headerCls}>
        <Flex justify="between" className={headerCls}>
          <Flex.Item>{isEdit ? <span onClick={this.onSubmitCart}>确定</span> : <span onClick={this.onEdit}>编辑</span>}</Flex.Item>
          <Flex.Item style={{ textAlign: 'right' }}> {isEdit ? <span onClick={this.onCartCancel}>取消</span> : ''} </Flex.Item>
        </Flex>
      </div>
      <List className={listCls}>
        {list && list.map((item: CartItemProps) => isEdit ? (<Checkbox.CheckboxItem key={item._id}>
          <CartItem {...item} isEdit={isEdit} />
        </Checkbox.CheckboxItem>) : <CartItem {...item} isEdit={isEdit} />)}
      </List>
      <div className={bottomCls}>
        {isEdit && <div className={`${prefixCls}-check-bar`}>
          <AgreeItem style={{ display: 'inline-block', marginRight: '1rem' }} checked={isCheckAll} onChange={this.onCheckAll}>全选</AgreeItem>
          <span onClick={this.onDelete}>删除</span>
        </div>}
        <div className={countCls}>
          <div className={`${countCls}__money`}>合计：¥ {sumMoney}</div>
          <div className={`${countCls}__num`}>购买({sumNum})</div>
        </div>
      </div>

      <BottomNav curtPage="cart" />
    </div>)
  }
}

export default Cart 