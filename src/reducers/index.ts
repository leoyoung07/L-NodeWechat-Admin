import { combineReducers } from 'redux';
import { IAuthentication } from '../interfaces';
import { authentication } from './authentication.reducer';

const rootReducer = combineReducers<{authentication: IAuthentication}>({
  authentication
});

export default rootReducer;
