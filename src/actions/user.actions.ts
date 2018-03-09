import { LOGIN_ACTION } from '../constants';

export const userActions = {
  login
};

function login() {
  return {
    type: LOGIN_ACTION.LOGIN_SUCCESS,
    user: {}
  };
}
