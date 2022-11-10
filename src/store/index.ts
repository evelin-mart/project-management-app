import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userSlice } from './user';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; 

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}
