import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
/**此处不引入react-router【必须先引入React组件】**/
import { HashRouter, Route } from 'react-router-dom';
//容器组件
import App from './containers/App';
//顶层reducers
import todoApp from './reducers/index';
import { logger, crashReporter } from './MiddlewareActions';

//传入reducers创建Redux Store
const store = createStore(
  todoApp,
  // applyMiddleware() tells createStore() how to handle middleware
  applyMiddleware(logger, crashReporter)
);


ReactDOM.render(
  <Provider store={store}>
	<HashRouter>
		<Route path="/:filter?" component={App} />
	</HashRouter>
  </Provider>,
  document.getElementById('app')
);
