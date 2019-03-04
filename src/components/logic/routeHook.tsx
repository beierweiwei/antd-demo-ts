import { Redirect } from 'react-router';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { setTitleAction } from 'src/store/actions/system';
interface RouteHookProps {
  user?: UserState,
  title: string 
  author?: boolean
  setTitle?: ()=>void 
}
const RouteHookC = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P & RouteHookProps> => 
  ({
    user,
    author,
    setTitle,
    ...props
  }: RouteHookProps) => {
    // tslint:disable-next-line:curly
    if (setTitle)  setTimeout(() => setTitle(), 0)
    return author ? user && user.isLogin ? <Component {...props as P} /> : <Redirect to="/login" /> :<Component {...props as P} /> 
  }

const mapStateToProps = ({user}:StoreState) => ({
  user
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>, onwProps: RouteHookProps) => ({
  setTitle: () => dispatch(setTitleAction(onwProps.title))
})


const RouteHook = (component: React.ComponentType) => connect(mapStateToProps, mapDispatchToProps)(RouteHookC(component))
export default RouteHook