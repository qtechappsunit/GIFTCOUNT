import { createSlice } from '@reduxjs/toolkit';

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
});

export const { UserType, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;