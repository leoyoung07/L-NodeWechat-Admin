import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions } from '../actions';
import { IAction, IState } from '../interfaces';
import '../style/Login.scss';

interface IProps {
  loggedIn: boolean;
  user: {};
  onLogin: () => void;
}

class Login extends React.Component<IProps> {

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="Login" onClick={this.props.onLogin}>
        Login
      </div>
    );
  }
}

function mapStateToProps(state: IState) {
  return {
    loggedIn: state.authentication.loggedIn,
    user: {}
  };
}

function mapDispatchToProps(dispatch: (action: IAction) => void) {
  return {
    onLogin: () => {
      dispatch(userActions.login());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
