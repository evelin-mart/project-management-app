import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from 'services/Auth';
import { SignInQuery, SignUpQuery } from 'services/Auth.types';
import { AsyncThunkConfig } from 'store';
import { UserData } from './interface';

const initialState = {
  data: {
    id: '',
    name: '',
    login: '',
    token: '',
    exp: Date.now(),
  },
  isLoading: false,
  error: '',
};

export const createUser = createAsyncThunk<UserData, SignUpQuery, AsyncThunkConfig>(
  'user/createUser',
  async (query) => {
    const data = await signUp(query);

    return initialState.data;
  }
);

export const authorizeUser = createAsyncThunk<UserData, SignInQuery, AsyncThunkConfig>(
  'user/authorizeUser',
  async (query) => {
    const data = await signIn(query);

    return initialState.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authorizeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

const { logout } = userSlice.actions;
