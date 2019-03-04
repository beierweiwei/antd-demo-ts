import * as React from 'react'
import './App.css';
import HeaderContainer from './components/loayout/header';
import { Flex } from 'antd-mobile';
interface AppProps  {
  [index:string]: any 
}
export class App extends React.Component<AppProps> {
  render() {
    const { children } = this.props
    return (
      <Flex direction="column" align="start" className="App">
       <HeaderContainer/>
        <Flex.Item style={{width: '100%', overflow: 'auto'}}>
          {children}
        </Flex.Item>
      </Flex>
    );
  }
}


export default App
