import React, { useState, useRef } from 'react'
import { Modal } from 'antd-mobile';
import './index.less'
import { Http } from 'src/api';
import { PAY_PASSWORD } from 'src/api/api';
interface PaymentState {
  password: string
  lockPost: boolean
}
interface PaymentProps {
  orderId: string
  success?: () => void
  fail?: () => void
  isShow: boolean
  onClose?: () => void
}
export default class Payment extends React.Component<PaymentProps, PaymentState>{
  input: any;
  constructor(props: PaymentProps) {
    super(props)
    this.state = {
      password: '',
      lockPost: false,
    }
  }
  onClick = () => {
    this.input.focus()
  }
  onClose = () => {

    const { fail, onClose } = this.props
    // tslint:disable-next-line:no-unused-expression
    onClose && onClose()
    this.setState({ password: '' })
    if (typeof fail === 'function') {
      fail()
    }
  }
  handleInputPassword = (e: any) => {
    // tslint:disable-next-line:curly
    if (this.state.lockPost) return
    let value = e.target.value
    // 过滤非法输入
    value = value.replace(/\D/g, '').slice(0, 6)
    this.setState({ password: value }, () => {
      if (value.length === 6 && !this.state.lockPost) {
        // tslint:disable-next-line:no-unused-expression
        this.postPassword()
      }
    })

  }

  postPassword = () => {
    this.setState({ lockPost: true })
    const { password } = this.state
    const { success, fail, orderId } = this.props
    const params = { password }
    Http.post(PAY_PASSWORD + orderId, params).then(() => {
      if (typeof success === 'function') {
        success()
      }
    }, () => {
      if (typeof fail === 'function') {
        this.setState({ password: '' })
        fail()
      }
    }).then(() => this.setState({ lockPost: false }))
  }
  componentWillReceiveProps(pre: any) {
    const { isShow } = pre
    if (isShow) {
      this.setState({ password: '' })
      // tslint:disable-next-line:no-unused-expression
      setTimeout(() => this.input && this.input.focus())

    }
  }
  render() {
    const prefixClas = 'c-payment'
    const { password } = this.state
    const { isShow } = this.props
    const passwordWordArr = password.split('')
    return (
      <div>
        <Modal
          visible={isShow}
          transparent={true}
          closable={true}
          onClose={this.onClose}
        >
          <div className={`${prefixClas}`} onClick={this.onClick}>
            <div>请输入6位数字交易密码<input style={{ height: 0, width: 0, border: 0, zIndex: -1 }} ref={(input) => this.input = input} value={password} onChange={this.handleInputPassword} /></div>
            <div className={`${prefixClas}-password_wrap`}>
              {
                Array(6).fill(0).map((v, i) => <span className={`${prefixClas}-password_input_item`} key={i}>{passwordWordArr[i] !== undefined ? '*' : ''} </span>)
              }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
