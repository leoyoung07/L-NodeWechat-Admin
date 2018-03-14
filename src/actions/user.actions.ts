import { browserHistory } from 'react-router';
import { LOGIN_ACTION } from '../constants';
import { IAction } from '../interfaces';

export const userActions = {
  login,
  logout
};

function login() {
  return (dispatch: (action: IAction) => void) => {
    localStorage.setItem('loggedIn', 'true');
    browserHistory.push('/');
    dispatch({
      type: LOGIN_ACTION.LOGIN_SUCCESS,
      user: {}
    });
  };
}

function logout() {
  return (dispatch: (action: IAction) => void) => {
    localStorage.setItem('loggedIn', 'false');
    dispatch({
      type: LOGIN_ACTION.LOGOUT,
      user: {}
    });
  };
}
