import React from 'react';
import { InputItem, List, Button, Toast } from 'antd-mobile';
import './index.less';
import { validateFor } from 'src/utils/reg';
import { Http, API } from 'src/api';
import Cookie from 'src/utils/cookie';
import { RouteComponentProps, withRouter } from 'react-router';

interface LoginPageProps extends RouteComponentProps {
  [index:string]:any 
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
}

class LoginPage extends React.Component<LoginPageProps, LoginPageStatus> {
  constructor (props:LoginPageProps) {
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

  validateFor = (value: string, field:string, type: string|string[]) => {
    const { validatedMsgs } = this.state
    validatedMsgs[field] = validateFor(value, type)
    this.setState({
      ...this.state, 
      validatedMsgs
    })
  }
  setParamsAndValidate = (value:string, field:string, type:string|string[]):void => {
    const { form } = this.state 
    form[field] = value 
    this.setState({
      ...this.state,
      form
    })
    this.validateFor(value, field, type)
  }
  showErrorMsg = (field:string) => {
    Toast.info(this.state.validatedMsgs[field])
  }
  validateAll = () => {
    const { validatedMsgs } = this.state
    return Object.keys(validatedMsgs).every((field:string) => validatedMsgs[field])
  }
  submit = () => {
    if (!this.validateAll()) {
      this.props.postLogin(this.state.form).then(() => this.props.history.push('/user/123'))
    }
  }
  postLogin = () => {
    Http.post(API.LOGIN, this.state.form).then(res => {
      Cookie.set('user', res)
      console.log('-------------')
      this.props.history.push('/user/xxxxxxx')
    })
  }
  componentWillMount () {
    console.log('xxxxx')  
  }

  render () {
    const prefixCls = 'login-page'
    const { form, validatedMsgs } = this.state 
    const { username, password } = form
    return (
      <div className={`${prefixCls}`}>
        <List renderFooter={<Button className={`${prefixCls}-submit`} onClick={this.submit}>登陆</Button>}>
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