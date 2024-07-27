import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import { authApi } from '../services';

const Reducer = combineReducers({
  authReducer: AuthReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof Reducer>

export default Reducer;
