import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUserById, signIn, signUp, updateUserById } from 'services';
import { SignInQuery, SignUpQuery } from 'services/Auth.types';
import { UpdateUserResponse } from 'services/User.types';
import { signIn, signUp } from 'services/Auth';
import { SignInQuery, SignUpQuery } from 'services/types/Auth.types';
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
  async (query) => signUp(query)
);

export const authorizeUser = createAsyncThunk<Partial<UserData>, SignInQuery, AsyncThunkConfig>(
  'user/authorizeUser',
  async (query) => signIn(query)
);

export const updateUser = createAsyncThunk<UpdateUserResponse, UserData, AsyncThunkConfig>(
  'user/updateUser',
  async (query, { getState }) => {
    const { token, id } = getState().user.data;
    return updateUserById({ ...query, token, id });
  }
);

export const deleteUser = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'user/deleteUser',
  async (query, { getState }) => {
    const { token, id } = getState().user.data;
    await deleteUserById({ token, id });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authorizeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
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
        state.error = action.error.message || '';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = { ...state.data, ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, () => {
        return initialState;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
  },
});

export const { logout } = userSlice.actions;
