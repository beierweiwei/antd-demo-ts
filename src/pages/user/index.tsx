import React, { Component } from 'react'
import { Card, Flex } from 'antd-mobile';
import './index.less'
import { Link } from 'react-router-dom';
import { Http } from 'src/api';

export default class User extends Component<UserItemState> {
  constructor (props:UserItemState) {
    super(props)
  }
  render() {
    const { username , avatar, money  } = this.props
    const prefixCls = 'user'
    return (
      <div className={`${prefixCls}`}>
        <Card>
          <Card.Body>
            <div className={`${prefixCls}-info`}>
              <div className={`${prefixCls}-avatar`}>
                <img src={avatar} />
              </div>
              <div className={`${prefixCls}-body`}>
                <p>{username || 'null'} </p>
                <p>账户：{money}</p>
              </div>
              <div className={`${prefixCls}-setting`}>
                <i className="icon-shezhi iconfont" />设置
              </div>
            </div>
          </Card.Body>
        </Card>
        <Flex className={`${prefixCls}-order-cate shop-cell`}>
          <Flex.Item>
            <Link to="/order?type=0">
              <div className={`${prefixCls}-order-cate-icon`}><i className="iconfont icon-waitpay icon-shijian" /></div>
              <div>待付款</div>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/order?type=1">
              <div className={`${prefixCls}-order-cate-icon`}><i className="iconfont icon-liwu" /></div>
              <div>待收货</div>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/order?type=2">
              <div className={`${prefixCls}-order-cate-icon`}><i className="iconfont icon-7" /></div>
              <div>退换/售后</div>
            </Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="/order">
              <div className={`${prefixCls}-order-cate-icon`}><i className="iconfont icon-wodedingdan" /></div>
              <div>全部订单</div>
            </Link>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
