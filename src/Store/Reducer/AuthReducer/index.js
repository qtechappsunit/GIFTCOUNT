import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: {
    userType: null,
  },
  reducers: {
    UserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { UserType } = AuthSlice.actions;

export default AuthSlice.reducer;