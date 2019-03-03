import { Redirect } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
interface CheckLoginProps extends React.Props<any> {
  user: UserState
}
const CheckLoginComp = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P & CheckLoginProps> => 
  ({
    user,
    ...props
  }: CheckLoginProps) => user.isLogin ? <Component {...props as P} /> : <Redirect to="/login" />

const mapStateToProps = ({user}:StoreState) => ({
  user
})


const CheckLogin = (component: React.ComponentType): React.ComponentType => connect(mapStateToProps)(CheckLoginComp(component))
export default CheckLogin