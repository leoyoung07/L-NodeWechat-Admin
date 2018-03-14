import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { checkAuth, store } from './helpers';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';
import Login from './views/Login';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <div>
        <Route path="/" component={App} onEnter={checkAuth} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
