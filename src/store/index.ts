import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardsSlice } from './boards';
import { selectedBoardSlice } from './selectedBoard';
import { userSlice } from './user';
import { authAPI, usersAPI, boardsAPI, columnsAPI, tasksAPI, fileAPI, pointsAPI } from 'services';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [selectedBoardSlice.name]: selectedBoardSlice.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [boardsAPI.reducerPath]: boardsAPI.reducer,
    [columnsAPI.reducerPath]: columnsAPI.reducer,
    [tasksAPI.reducerPath]: tasksAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
    [pointsAPI.reducerPath]: pointsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(usersAPI.middleware)
      .concat(boardsAPI.middleware)
      .concat(columnsAPI.middleware)
      .concat(tasksAPI.middleware)
      .concat(fileAPI.middleware)
      .concat(pointsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}
