import React from 'react';
import { InputItem, List, Button, Toast } from 'antd-mobile';
import '../index.less';
import { validateFor } from 'src/utils/reg';
import { Http, API } from 'src/api';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

interface LoginPageProps extends RouteComponentProps {
  [index: string]: any
}
interface LoginPageStatus {
  form: {
    username: string
    password: string
    tel?: string
    smsCode?: string
  },
  validatedMsgs: {
    username?: string
    password?: string
    tel?: string | number
    smsCode?: string | number
  },
  [index:string]: any
}

class LoginPage extends React.Component<LoginPageProps, LoginPageStatus> {
  constructor(props: LoginPageProps) {
    super(props)
    this.state = {
      form: {
        username: '',
        password: '',
      },
      validatedMsgs: {
        password: '',
        username: ''
      }
    }
  }

  validateFor = (value: string, field: string, type: string | string[]) => {
    const { validatedMsgs } = this.state
    validatedMsgs[field] = validateFor(value, type)
    this.setState({
      ...this.state,
      validatedMsgs
    })
  }
  setParamsAndValidate = (value: string, field: string, type: string | string[]): void => {
    const { form } = this.state
    form[field] = value
    this.setState({
      ...this.state,
      form
    })
    this.validateFor(value, field, type)
  }
  showErrorMsg = (field: string) => {
    Toast.info(this.state.validatedMsgs[field])
  }
  validateAll = () => {
    const { validatedMsgs } = this.state
    return Object.keys(validatedMsgs).every((field: string) => validatedMsgs[field])
  }
  submit = () => {
    if (!this.validateAll()) {
      this.postRegist()
    }
  }
  postRegist = () => {
    return Http.post(API.REGIST, this.state.form).then(res => {
      Toast.success('恭喜，注册成功！')
      setTimeout(() => this.props.history.push('/login'),1000)
    }).catch((err) => Toast.fail('注册失败！'))
  }
  render() {
    const prefixCls = 'login-page'
    const { form, validatedMsgs } = this.state
    const { username, password } = form
    return (
      <div className={`${prefixCls}`}>
        <List renderFooter={<Button className={`${prefixCls}-submit`} onClick={this.submit}>注册</Button>}>
          <InputItem
            type="text"
            placeholder="用户名"
            clear={true}
            value={username}
            onChange={(value) => this.setParamsAndValidate(value, 'username', ['username', 'require'])}
            error={!!validatedMsgs.username}
            onErrorClick={() => this.showErrorMsg('username')}
          />

          <InputItem
            type="password"
            placeholder="密码"
            clear={true}
            value={password}
            onChange={value => this.setParamsAndValidate(value, 'password', ['password', 'require'])}
            error={!!validatedMsgs.password}
            onErrorClick={() => this.showErrorMsg('password')}
          />
        </List>
      </div>
    )
  }
}

export default withRouter(LoginPage)