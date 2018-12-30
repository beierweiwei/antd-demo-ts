import { Flex, Icon } from 'antd-mobile'
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
        <Flex.Item className={curtPage === 'home' ? 'active' : ''}><Link to="/" className={`${prefix}title`}><div><Icon type="search"/><div>首页</div></div></Link></Flex.Item>
        <Flex.Item className={curtPage === 'cate' ? 'active' : ''}><Link to="/cate"><span>分类</span></Link></Flex.Item>
        <Flex.Item className={curtPage === 'cart' ? 'active' : ''}><Link to="/cart"><span>购物车</span></Link></Flex.Item>
        <Flex.Item className={curtPage === 'user' ? 'active' : ''}><Link to="/user"><span>我的</span></Link></Flex.Item>
      </Flex>
    </div>
  )
}
export default bottomNav