import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateUserResponse } from 'services/types/Users.types';
import { Auth, Users } from 'services';
import { SignInQuery, SignUpQuery } from 'services/types/Auth.types';
import { AsyncThunkConfig } from 'store';
import { UserData } from './interface';
import { UpdateUserRequest } from 'services/types/Users.types';

const initialState = {
  data: {
    id: '',
    name: '',
    login: '',
    token: '',
    iat: Date.now(),
  },
  isLoading: false,
  error: '',
};

export const createUser = createAsyncThunk<UserData, SignUpQuery, AsyncThunkConfig>(
  'user/createUser',
  async (query) => {
    return await Auth.signUp(query);
  }
);

export const authorizeUser = createAsyncThunk<UserData, SignInQuery, AsyncThunkConfig>(
  'user/authorizeUser',
  async (query) => {
    const signInData = await Auth.signIn(query);
    const { name } = await Users.getUserById(signInData);
    return { ...signInData, name };
  }
);

export const updateUser = createAsyncThunk<UpdateUserResponse, UpdateUserRequest, AsyncThunkConfig>(
  'user/updateUser',
  async (query, { getState }) => {
    const { id } = getState().user.data;
    return Users.updateUserById({ ...query, id });
  }
);

export const deleteUser = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'user/deleteUser',
  async (_, { getState }) => {
    const { id } = getState().user.data;
    await Users.deleteUserById({ id });
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
        state.data = action.payload;
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
