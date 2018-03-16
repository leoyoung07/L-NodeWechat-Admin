import { browserHistory } from 'react-router';
import { USER_ACTION } from '../constants';
import { Storage } from '../helpers';
import { IAction } from '../interfaces';

export const userActions = {
  login,
  logout
};

function login() {
  return (dispatch: (action: IAction) => void) => {
    Storage.set('loggedIn', 'true');
    browserHistory.push('/');
    dispatch({
      type: USER_ACTION.LOGIN_SUCCESS,
      user: {}
    });
  };
}

function logout() {
  return (dispatch: (action: IAction) => void) => {
    Storage.set('loggedIn', 'false');
    dispatch({
      type: USER_ACTION.LOGOUT_SUCCESS,
      user: {}
    });
  };
}
