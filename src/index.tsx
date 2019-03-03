import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.less';
import registerServiceWorker from './registerServiceWorker'
import AppRouter from './routers';

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker()

// document.addEventListener('touchstart touchend',  (event) => {
//   // 判断默认行为是否可以被禁用
//   if (event.cancelable) {
//     // 判断默认行为是否已经被禁用
//     if (!event.defaultPrevented) {
//       event.preventDefault();
//     }
//   }
// }, false)