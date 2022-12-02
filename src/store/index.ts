import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardSlice } from './board';
import { boardsSlice } from './boards';
import { snackbarSlice } from './snackbar';
import { listenerMiddleware } from './middleware';
import { modalSlice } from './modal';
import { userSlice } from './user';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [boardSlice.name]: boardSlice.reducer,
    [snackbarSlice.name]: snackbarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}
