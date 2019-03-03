import * as React from 'react'
import './App.css';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter, RouteComponentProps } from 'react-router';
interface AppProps extends RouteComponentProps {
  [index:string]: any 
}
class App extends React.Component<AppProps> {

  componentWillReceiveProps (pre:any) {
    console.log(pre)
  }
  render() {
    const { children } = this.props
    return (
      <div className="App">
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('reback')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          <input />
        </NavBar>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
export default withRouter(App);
