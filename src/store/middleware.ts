import {
  createListenerMiddleware,
  isAllOf,
  isAnyOf,
  isFulfilled,
  isRejected,
  isAsyncThunkAction,
} from '@reduxjs/toolkit';
import { BaseService } from 'services/BaseService';
import { RootState } from 'store';
import { setSnackbar } from './snackbar';
import {
  authorizeUser,
  hydrate,
  logout,
  userStateId,
  updateUser,
  createUser,
  deleteUser,
} from './user';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAllOf(isAsyncThunkAction, isRejected),
  effect: (action, listenerApi) => {
    if (action.error.message) {
      listenerApi.dispatch(setSnackbar({ message: action.error.message, variant: 'error' }));
    }
    if (action.error.code === '403' || action.error.code === '401') {
      listenerApi.dispatch(logout());
    }
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(
    logout,
    isFulfilled(createUser),
    isFulfilled(deleteUser),
    isFulfilled(authorizeUser),
    isFulfilled(updateUser)
  ),
  effect: (_, listenerApi) => {
    localStorage.setItem(userStateId, JSON.stringify((listenerApi.getState() as RootState).user));
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(logout, hydrate, isFulfilled(authorizeUser)),
  effect: (_, listenerApi) => {
    BaseService.setToken((listenerApi.getState() as RootState).user.data.token);
  },
});
