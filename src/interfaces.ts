export interface IAction {
  type: string;
  user: {};
}

export interface IState {
 authentication: IAuthentication;
}

export interface IAuthentication {
  loggedIn: boolean;
  user: {};
}
