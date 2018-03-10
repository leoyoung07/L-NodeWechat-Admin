import { LOGIN_ACTION } from '../constants';
import { IAction } from './interfaces';
import { ILoginState } from './interfaces';

const defaultState: ILoginState = {
  loggedIn: false,
  user: {}
};

export function authentication(state: ILoginState = defaultState, action: IAction): ILoginState {
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
