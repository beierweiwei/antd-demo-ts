import { Route, BrowserRouter as Router } from 'react-router-dom'
import * as React from 'react'
import Home from './container/home'
import User from './container/user'
import Cate from './container/cate'
import Cart from './container/cart'
import ProductList from './container/productList'
import ProductDetail from './pages/product/detail'
import { LoginPageContainer, RegistPageContainer } from './container/login'
import Main from './App';
import RouteHook from './components/logic/routeHook';
import Statement from './pages/statement';
import Address from './pages/address';
import AddressList from './container/addressList';
import { success, fail } from './pages/pay';
import OrderDetail from './pages/order/detail';
import OrderList from './container/order';
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
    // author: true,
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
  {
    path: '/statement',
    component: Statement,
    meta: {
      title: '结算单'
    }
  },
  {
    path: '/address',
    component: Address,
    exact: true,
    meta: {
      title: '新增/编辑地址'
    }
  },
  {
    path: '/address/list',
    component: AddressList,
    exact: true,
    // author: true,
    meta: {
      title: '地址列表'
    }
  },
  {
    path: '/pay/success',
    component: success,
    exact: true,
    meta: {
      title: '支付成功'
    }
  },
  {
    path: '/pay/fail',
    component: fail,
    exact: true,
    meta: {
      title: '支付失败'
    }
  },
  {
    path: '/order',
    component: OrderList,
    exact: true,
    meta: {
      title: '订单列表'
    }
  },
  {
    path: '/order/:id',
    component: OrderDetail,
    exact: true,
    meta: {
      title: '订单详情'
    }
  }
 
]

const renderRoute = ({component, path, exact, meta, author}:any) => { 
  const WrappedCom = RouteHook(component)
  return <Route path={path} render={(props) => <WrappedCom title={meta && meta.title} author={!!author}/>} key={path} exact={exact} /> 
}
const AppRouter = () => (
  <Router>
    <Main>
      {routers.map(renderRoute)}
    </Main>
  </Router>
);


export default AppRouter
