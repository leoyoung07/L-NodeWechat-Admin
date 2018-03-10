import React from 'react';
import { Redirect } from 'react-router-dom';
import { store } from '../helpers/store';
import { userActions } from '../actions';
import '../style/Login.scss';

class Login extends React.Component {
  loginClick () {
    store.dispatch(userActions.login());
  }
  render() {
    if (store.getState().authentication.loggedIn) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="Login" onClick={this.loginClick}>
        Login
      </div>
    );
  }
}

export default Login;
