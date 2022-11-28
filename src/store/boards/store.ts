import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { unknownErrorMessage } from '../../constants';
import { Board } from 'services';
import { AsyncThunkConfig, RootState } from 'store';
import { BoardData } from './interface';
import {
  createBoardRequest,
  deleteBoardRequest,
  updateBoardRequest,
} from 'services/types/Board.types';

const initialState = {
  data: [] as BoardData[],
  isLoading: false,
  error: '',
};

export const getBoards = createAsyncThunk<BoardData[], void, AsyncThunkConfig>(
  'boards/getBoards',
  async () => {
    return await Board.getAllBoards();
  }
);

export const addBoard = createAsyncThunk<BoardData, createBoardRequest, AsyncThunkConfig>(
  'boards/addBoard',
  async (query) => {
    return await Board.createBoard(query);
  }
);

export const deleteBoard = createAsyncThunk<string, deleteBoardRequest, AsyncThunkConfig>(
  'boards/deleteBoard',
  async (query) => {
    await Board.deleteBoard(query);
    return query.id;
  }
);

export const updateBoard = createAsyncThunk<BoardData, updateBoardRequest, AsyncThunkConfig>(
  'boards/updateBoard',
  async (query) => {
    return await Board.updateBoard(query);
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoards.fulfilled, (_, action) => {
        return {
          data: action.payload,
          isLoading: false,
          error: '',
        };
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(addBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        return {
          data: [...state.data, action.payload],
          isLoading: false,
          error: '',
        };
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        return {
          data: state.data.filter((board) => board.id !== action.payload),
          isLoading: false,
          error: '',
        };
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(updateBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        return {
          data: state.data.map((board) =>
            board.id === action.payload.id ? action.payload : board
          ),
          isLoading: false,
          error: '',
        };
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      });
  },
});

export const selectBoards = (state: RootState) => state.boards;
