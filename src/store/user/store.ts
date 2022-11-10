import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from './interface';

const initialState = {
  data: {
    id: '',
    name: '',
    login: '',
    token: '',
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state = initialState;
    },
  },
});
