import { LOGIN_ACTION } from '../constants';
import { IAction } from './interfaces';

const defaultState = {
  loggedIn: false,
  user: {}
};

export function authentication(state: {} = defaultState, action: IAction) {
  switch (action.type) {
    case LOGIN_ACTION.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case LOGIN_ACTION.LOGOUT:
      return {
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
