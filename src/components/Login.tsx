import React from 'react';
import { store } from '../helpers/store';
import { userActions } from '../actions';
import '../style/Login.scss';

class Login extends React.Component {

  loginClick () {
    store.dispatch(userActions.login());
    // tslint:disable-next-line:no-console
    console.log(store.getState());
  }
  render() {
    // tslint:disable-next-line:no-console
    console.log(store.getState());
    return (
      <div className="Login" onClick={this.loginClick}>
        Login
      </div>
    );
  }
}

export default Login;
