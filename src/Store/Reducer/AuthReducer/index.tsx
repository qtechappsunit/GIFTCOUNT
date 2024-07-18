import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthTypes {
  userType: string
}

const initialState: AuthTypes = {
  userType: ''
}

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    UserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
  },
});

export const { UserType } = AuthSlice.actions;

export default AuthSlice.reducer;