import { connect } from 'react-redux'
import LoginPage from '../pages/login'
import RegistPage from '../pages/login/regist'
import { postLogin } from 'src/store/actions/user';
import { ThunkDispatch } from 'redux-thunk';
// const mapStateToprops = ({ user }: StoreState) => {
//   return {
//     ...home
//   }
// }
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    postLogin: (params:any) => dispatch(postLogin(params)),
  }
}
export const LoginPageContainer = connect(null, mapDispatchToProps)(LoginPage)
export const RegistPageContainer = connect(null, mapDispatchToProps)(RegistPage)