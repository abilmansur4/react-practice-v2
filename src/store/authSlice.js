import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false
  },
  reducers: {
    loginSuccess(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    refreshSuccess: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  }
});

export const { loginSuccess, logout, refreshSuccess } = authSlice.actions;
export default authSlice.reducer;