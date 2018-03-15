import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../views/Login';

xit('Login: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
});
