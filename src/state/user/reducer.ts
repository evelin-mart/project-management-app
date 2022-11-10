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
    logout(state) {
      state = initialState;
    }
  }
});
