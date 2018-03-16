import { EnterHook } from 'react-router';
import { Storage } from '../helpers';
export const checkAuth: EnterHook = (state, replace) => {
  // check auth
  if (Storage.get('loggedIn') !== 'true') {
    replace('/login');
  }

};
