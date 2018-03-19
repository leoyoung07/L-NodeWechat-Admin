import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { checkAuth, store } from './helpers';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import MenuDesigner from './views/MenuDesigner';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route path="/" component={App} onEnter={checkAuth}>
          <IndexRoute component={Dashboard} />
          <Route path="dashboard" component={Dashboard}/>
          <Route path="menu_designer" component={MenuDesigner}/>
        </Route>
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
