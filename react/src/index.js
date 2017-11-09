import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


//容器组件
import App from './containers/App';
//顶层reducers
import todoApp from './reducers/index';
//传入reducers创建Redux Store
const store = createStore(todoApp);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
