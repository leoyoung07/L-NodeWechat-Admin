import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store } from './helpers/store';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';
import Login from './views/Login';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact={true} path="/" component={App} />
        <Route exact={true} path="/login" component={Login} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
