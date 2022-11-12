import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  login: '',
  token: '',
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state = initialState;
    },
  },
});

export const { login } = userSlice.actions;
