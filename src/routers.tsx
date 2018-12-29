import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as React from 'react'; 
import Home from './pages/home';
import User from './pages/user';

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route path="/user" component={User} />
    </div>
  </Router>
);
export default AppRouter
