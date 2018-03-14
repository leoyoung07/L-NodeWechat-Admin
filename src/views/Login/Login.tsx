import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import { IState } from '../../interfaces';
import './Login.scss';

interface IProps {
  loggedIn: boolean;
  user: {};
  onLogin: () => void;
  onLogout: () => void;
}

class Login extends React.Component<IProps> {

  constructor (props: IProps) {
    super(props);
    this.props.onLogout();
  }

  render() {
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

function mapDispatchToProps(dispatch: Function) {
  return {
    onLogin: () => {
      dispatch(userActions.login());
    },
    onLogout: () => {
      dispatch(userActions.logout());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
