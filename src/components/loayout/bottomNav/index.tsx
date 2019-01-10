import { Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'
import * as React from 'react'
import './index.less'
interface NavProps {
  curtPage: string
}
const bottomNav = (props:NavProps) => {
  const { curtPage } = props
  const prefix = 'bottom-nav-'
  return (
    <div className={`${prefix}container`}>
      <Flex className={`${prefix}container-content`}>
        <Flex.Item className={curtPage === 'home' ? 'active' : ''}><Link to="/"><div className={`${prefix}item-icon`}><i className="iconfont icon-home" /></div><div>首页</div></Link></Flex.Item>
        <Flex.Item className={curtPage === 'cate' ? 'active' : ''}><Link to="/cate"><div className={`${prefix}item-icon`}><i className="iconfont icon-fenlei" /></div><div>分类</div></Link></Flex.Item>
        <Flex.Item className={curtPage === 'cart' ? 'active' : ''}><Link to="/cart"><div className={`${prefix}item-icon`}><i className="iconfont icon-cart" /></div><div>购物车</div></Link></Flex.Item>
        <Flex.Item className={curtPage === 'user' ? 'active' : ''}><Link to="/user"><div className={`${prefix}item-icon`}><i className="iconfont icon-user" /></div><div>我的</div></Link></Flex.Item>
      </Flex>
    </div>
  )
}
export default bottomNav