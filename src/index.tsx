import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
import { store } from './helpers/store';
import './style/index.scss';

const render = () => {
  ReactDOM.render(
    <Router>
      <div>
        <Route exact={true} path="/" component={App}/>
        <Route exact={true} path="/login" component={Login}/>
      </div>
    </Router>,
    document.getElementById('root') as HTMLElement
  );
};
render();
registerServiceWorker();

store.subscribe(() => {
  render();
});
