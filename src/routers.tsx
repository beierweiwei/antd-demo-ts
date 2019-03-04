import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as React from 'react'
import Home from './container/home'
import User from './pages/user'
import Cate from './container/cate'
import Cart from './pages/cart'
import ProductList from './container/productList'
import ProductDetail from './pages/product/detail'
import { LoginPageContainer, RegistPageContainer } from './container/user'
import Main from './App';
import RouteHook from './components/logic/routeHook';

const routers = [
  {
    path: '/',
    component: Home,
    // component: import('./container/home'),
    exact: true,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/cate',
    // component: import('./container/cate'),
    component: Cate,
    exact: true,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    // component: import('./pages/cart'),
    component: Cart,
    exact: true,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/user',
    // component: import('./pages/cart'),
    component: User,
    exact: true,
    author: true,
    meta: {
      title: '用户中心',
      author: true 
    }
  },
  {
    path: '/Login',
    // component: import('./container/user').then(res => res.LoginPageContainer),
    component: LoginPageContainer,    
    exact: true,
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/regist',
    component: RegistPageContainer,
    // component: import('./container/user').then(res => res.RegistPageContainer),
    exact: true,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/product/list',
    component: ProductList,
    // component: import('./container/productList'),
    meta: {
      title: '商品列表'
    }
  },
  {
    path: '/product/detail',
    component: ProductDetail,
    // component: import('./container/productList'),
    meta: {
      title: '商品详情'
    }
  },
]

const renderRoute = ({component, path, exact, meta, author}:any) => { 
  const WrapedComp = RouteHook(component)
  return <Route path={path} render={(props) => <WrapedComp  title={meta.title} author={!!author}/>} key={path} exact={exact} /> 
}
const AppRouter = () => (
  <Router>
    <Main>
      {routers.map(renderRoute)}
    </Main>
  </Router>
);


export default AppRouter
