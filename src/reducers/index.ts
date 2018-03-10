import { authentication } from './authentication.reducer';
import { combineReducers } from 'redux';
import { ILoginState } from './interfaces';

const rootReducer = combineReducers<{authentication: ILoginState}>({
  authentication
});

export default rootReducer;
