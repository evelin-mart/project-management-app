import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { boardsSlice } from './boards';
import { selectedBoardSlice } from './selectedBoard';
import { userSlice } from './user';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [boardsSlice.name]: boardsSlice.reducer,
    [selectedBoardSlice.name]: selectedBoardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}
