import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import { store } from './helpers/store';
import registerServiceWorker from './registerServiceWorker';
import './style/index.scss';

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
