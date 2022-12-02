import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeleteUserRequest, UpdateUserResponse } from 'services/types/Users.types';
import { Auth, Users } from 'services';
import { SignInQuery, SignUpQuery } from 'services/types/Auth.types';
import { AsyncThunkConfig } from 'store';
import { UserData } from './interface';
import { UpdateUserRequest } from 'services/types/Users.types';
import { unknownErrorMessage } from '../../constants';

export const userStateId = 'user';

export const getUserFromLocalStorage = () => {
  try {
    const persistedUserState = localStorage.getItem(userStateId);
    if (persistedUserState) return JSON.parse(persistedUserState);
  } catch (e) {}
};

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

export const deleteUser = createAsyncThunk<void, DeleteUserRequest, AsyncThunkConfig>(
  'user/deleteUser',
  async (query) => {
    await Users.deleteUserById(query);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    hydrate: (_, action) => {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authorizeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authorizeUser.fulfilled, (_, action) => {
        return {
          data: action.payload,
          isLoading: false,
          error: '',
        };
      })
      .addCase(authorizeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (_, action) => {
        return {
          data: action.payload,
          isLoading: false,
          error: '',
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return {
          data: { ...state.data, ...action.payload },
          isLoading: false,
          error: '',
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, () => {
        return initialState;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      });
  },
});

export const { logout, hydrate } = userSlice.actions;
