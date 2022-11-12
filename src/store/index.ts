import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardsSlice } from './boards';
import { selectedBoardSlice } from './selectedBoard';
import { userSlice } from './user';
import { authAPI } from 'services/Auth';
import { usersAPI } from 'services/Users';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [selectedBoardSlice.name]: selectedBoardSlice.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware).concat(usersAPI.middleware),
});

type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}
