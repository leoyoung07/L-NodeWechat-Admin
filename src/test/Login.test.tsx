import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Login from '../views/Login';
import { store } from './mocks/store';

it('Login: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Login />
    </Provider>,
    div
  );
});
