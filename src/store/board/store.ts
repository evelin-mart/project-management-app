import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { unknownErrorMessage } from 'constants/ErrorMessages';
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
  board: { columns: [] },
  users: [],
  isLoading: false,
  editTitleColumnId: '',
  error: '',
} as unknown as BoardStore;

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setEditTitleColumnId: (state, action) => {
      state.editTitleColumnId = action.payload;
    },
    setColumnsInBoard: (state, action) => {
      state.board.columns = action.payload;
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
      .addCase(loadBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const columnId = action.payload.columnId;
        const column = state.board.columns.find((column) => column.id === columnId);
        const task = {
          ...action.payload,
          files: [],
          order: column!.tasks.length + 1,
          boardId: state.board.id,
          columnId: columnId,
        };
        if (column) {
          column.tasks.push(task);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.board.columns = [...state.board.columns, { ...action.payload, tasks: [] }];
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { columnId, id } = action.payload;
        state.board.columns = state.board.columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.map((task) => {
                if (task.id === id) {
                  return { ...task, ...action.payload, files: [] };
                } else {
                  return task;
                }
              }),
            };
          } else {
            return column;
          }
        });
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { columnId, taskId } = action.payload;
        state.board = {
          ...state.board,
          columns: state.board.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                tasks: column.tasks.filter((task) => task.id !== taskId),
              };
            }
            return column;
          }),
        };
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.board.columns = state.board.columns.filter(
          (column) => column.id !== action.payload.columnId
        );
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(updateColumnTitle.fulfilled, (state, action) => {
        state.board.columns = state.board.columns.map((column) => {
          if (column.id === action.payload.id) {
            return { ...action.payload, tasks: column.tasks };
          } else {
            return column;
          }
        });
      })
      .addCase(updateColumnTitle.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(updateMoveColumn.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      })
      .addCase(updateMoveTask.rejected, (state, action) => {
        state.error = action.error.message || unknownErrorMessage;
      });
  },
});

export const { setEditTitleColumnId, setColumnsInBoard } = boardSlice.actions;
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
    return { ...response, columnId };
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
    await Tasks.deleteTask({
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    });
    return { boardId, columnId, taskId };
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async ({ boardId, columnId }: deleteColumnRequest) => {
    await Columns.deleteColumn({
      boardId: boardId,
      columnId: columnId,
    });
    return { boardId, columnId };
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

export const updateMoveColumn = createAsyncThunk(
  'board/updateMoveColumn',
  async ({ boardId, columnId, body }: updateColumnRequest) => {
    const response = await Columns.updateColumn({
      boardId: boardId,
      columnId: columnId,
      body: body,
    });
    return response;
  }
);

export const updateMoveTask = createAsyncThunk(
  'board/updateMoveTask',
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
