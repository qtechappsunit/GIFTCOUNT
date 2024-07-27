import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services';

interface AuthTypes {
  userType: string,
  token: any,
  user: any
}

const initialState: AuthTypes = {
  userType: '',
  token: '',
  user: {}
}

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    UserType: (state, action) => {
      state.userType = action.payload;
    },
    Logout: (state) => {
      state.user = null,
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.createUser.matchFulfilled, (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    }),
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state,action) => {
      state.user = action.payload.user,
      state.token = action.payload.token
    })
  }
});

export const { UserType, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;