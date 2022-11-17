import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { BoardData } from './interface';

const initialState = {
  data: [] as BoardData[],
  isLoading: false,
  error: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<BoardData[]>) {
      state.data = action.payload;
    },
  },
});

export const selectBoards = (state: RootState) => state.boards;
