import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Board, Tasks, Users, Columns } from 'services';
import {
  createColumnRequest,
  deleteColumnRequest,
  updateColumnRequest,
} from 'services/types/Columns.types';
import {
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from 'services/types/Tasks.types';
import { BoardStore } from './interface';

const initialState = {
  board: {},
  users: [],
  isLoading: false,
  modal: '',
  modalData: {
    columnId: '',
    taskId: '',
  },
  editTitleColumnId: '',
} as unknown as BoardStore;

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setModalDataColumnId: (state, action) => {
      state.modalData.columnId = action.payload;
    },
    setModalDataTaskId: (state, action) => {
      state.modalData.taskId = action.payload;
    },
    setEditTitleColumnId: (state, action) => {
      state.editTitleColumnId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.board = action.payload.board;
        state.users = action.payload.users;
      })
      // .addCase(createTask.fulfilled, (state, action) => {})
      // .addCase(createColumn.fulfilled, (state, action) => {})
      // .addCase(updateTask.fulfilled, (state, action) => {})
      // .addCase(deleteTask.fulfilled, (state, action) => {})
      // .addCase(deleteColumn.fulfilled, (state, action) => {})
      // .addCase(updateColumnTitle.fulfilled, (state, action) => {})
      .addCase(loadBoard.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setIsLoading,
  setModal,
  setModalDataColumnId,
  setModalDataTaskId,
  setEditTitleColumnId,
} = boardSlice.actions;
export default boardSlice.reducer;

export const loadBoard = createAsyncThunk('board/loadBoard', async (boardId: string) => {
  const board = await Board.getBoard({ boardId: String(boardId) });
  const users = await Users.getAllUsers();
  return { board, users };
});

export const createTask = createAsyncThunk(
  'board/createTask',
  async ({ boardId, columnId, body }: createTaskRequest) => {
    const response = await Tasks.createTask({
      boardId: boardId,
      columnId: columnId,
      body: body,
    });
    return response;
  }
);

export const createColumn = createAsyncThunk(
  'board/createColumn',
  async ({ boardId, body }: createColumnRequest) => {
    const response = await Columns.createColumn({
      boardId: boardId,
      body: body,
    });
    return response;
  }
);

export const updateTask = createAsyncThunk(
  'board/updateTask',
  async ({ boardId, columnId, taskId, body }: updateTaskRequest) => {
    const response = await Tasks.updateTask({
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
      body: body,
    });
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async ({ boardId, columnId, taskId }: deleteTaskRequest) => {
    const response = await Tasks.deleteTask({
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    });
    return response;
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async ({ boardId, columnId }: deleteColumnRequest) => {
    const response = await Columns.deleteColumn({
      boardId: boardId,
      columnId: columnId,
    });
    return response;
  }
);

export const updateColumnTitle = createAsyncThunk(
  'board/updateColumnTitle',
  async ({ boardId, columnId, body }: updateColumnRequest) => {
    const response = await Columns.updateColumn({
      boardId: boardId,
      columnId: columnId,
      body: body,
    });
    return response;
  }
);
