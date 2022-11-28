import { createListenerMiddleware, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import { BaseService } from 'services/BaseService';
import { RootState } from 'store';
import { authorizeUser, hydrate, logout, userStateId, updateUser, createUser } from './user';

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(
    logout,
    isFulfilled(createUser),
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
