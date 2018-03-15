import { USER_ACTION } from '../constants';
import { IAction } from '../interfaces';
import { IAuthentication } from '../interfaces';

const defaultState: IAuthentication = {
  loggedIn: false,
  user: {}
};

export function authentication(state: IAuthentication = defaultState, action: IAction): IAuthentication {
  switch (action.type) {
    case USER_ACTION.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case USER_ACTION.LOGOUT_SUCCESS:
      return {
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
