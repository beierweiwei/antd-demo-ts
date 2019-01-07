import AppRouter from './routers'
import * as React from 'react'
import './App.css';
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppRouter/>
      </div>
    );
  }
}

export default App;
