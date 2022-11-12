import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardsState } from './interface';

const initialState = [] as BoardsState;

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<BoardsState>) {
      state = action.payload;
    },
  },
});
