import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';

const Reducer = combineReducers({
  authReducer: AuthReducer,
});

export default Reducer;
