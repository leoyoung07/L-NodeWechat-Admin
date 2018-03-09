import { authentication } from './authentication.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authentication
});

export default rootReducer;
