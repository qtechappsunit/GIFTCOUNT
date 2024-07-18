import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';

const Reducer = combineReducers({
  authReducer: AuthReducer,
});

export type RootState = ReturnType<typeof Reducer>

export default Reducer;
