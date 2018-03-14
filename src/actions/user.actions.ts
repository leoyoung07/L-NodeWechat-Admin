import { LOGIN_ACTION } from '../constants';
import { history } from '../helpers';
import { IAction } from '../interfaces';

export const userActions = {
  login,
  logout
};

function login() {
  return (dispatch: (action: IAction) => void) => {
    localStorage.setItem('loggedIn', 'true');
    history.push('/');
    dispatch({
      type: LOGIN_ACTION.LOGIN_SUCCESS,
      user: {}
    });
  };
}

function logout() {
  return (dispatch: (action: IAction) => void) => {
    localStorage.setItem('loggedIn', 'false');
    return {
      type: LOGIN_ACTION.LOGOUT,
      user: {}
    };
  };
}
