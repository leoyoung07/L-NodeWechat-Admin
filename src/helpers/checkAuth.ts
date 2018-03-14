import { EnterHook } from 'react-router';
export const checkAuth: EnterHook = (state, replace) => {
  // check auth
  if (localStorage.getItem('loggedIn') !== 'true') {
    replace('/login');
  }

};
