import { Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'
import * as React from 'react'
import './index.less'
interface NavProps {
  curtPage: string
}
const bottomNav = (props:NavProps) => {
  const { curtPage } = props
  const prefix = 'bottom-nav'
  const homeNavClassName = curtPage === 'home' ? 'active' : ''
  const cateNavClassName = curtPage === 'cate' ? 'active' : ''
  const cartNavClassName = curtPage === 'cart' ? 'active' : ''
  const userNavClassName = curtPage === 'user' ? 'active' : ''
  
  return (
    <div className={prefix}>
      <Flex className={`${prefix}-container`}>
        <Flex.Item className={homeNavClassName + ` ${prefix}-item`}><Link to="/"><div className={`${prefix}item-icon`}><i className="iconfont icon-home" /></div><div>首页</div></Link></Flex.Item>
        <Flex.Item className={cateNavClassName + ` ${prefix}-item`}><Link to="/cate"><div className={`${prefix}item-icon`}><i className="iconfont icon-fenlei" /></div><div>分类</div></Link></Flex.Item>
        <Flex.Item className={cartNavClassName + ` ${prefix}-item`}><Link to="/cart"><div className={`${prefix}item-icon`}><i className="iconfont icon-cart" /></div><div>购物车</div></Link></Flex.Item>
        <Flex.Item className={userNavClassName + ` ${prefix}-item`}><Link to="/user"><div className={`${prefix}item-icon`}><i className="iconfont icon-user" /></div><div>我的</div></Link></Flex.Item>
      </Flex>
    </div>
  )
}
export default bottomNav