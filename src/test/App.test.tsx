import React from 'react';
import ReactDOM from 'react-dom';
import App from '../views/App';

xit('App: renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
