import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as React from 'react'
import Home from './container/home'
import User from './pages/user'
import Cate from './container/cate'
import Cart from './pages/cart'
const AppRouter = () => (
  <Router>
    <div className="router-container">
      <Route path="/" exact={true} component={Home} />
      <Route path="/cate" component={Cate} />
      <Route path="/cart" component={Cart} />
      <Route path="/user" component={User} />
    </div>
  </Router>
);
export default AppRouter
