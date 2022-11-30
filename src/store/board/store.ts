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
  board: { columns: [] },
  users: [],
  isLoading: false,
  modal: 'none',
  modalData: {
    columnId: '',
    taskId: '',
  },
  dragTask: {},
  editTitleColumnId: '',
  editTask: {
    title: '',
    description: '',
    userId: '',
  },
  error: '',
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
    setColumnsInBoard: (state, action) => {
      state.board.columns = action.payload;
    },
    setDragTask: (state, action) => {
      state.board.columns = action.payload;
    },
    setEditTask: (state, action) => {
      state.editTask = action.payload;
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
        state.error = action.error.message || 'Error';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const columnId = state.modalData.columnId;
        const column = state.board.columns.find((column) => column.id === columnId);
        const task = { ...action.payload, files: [], order: column!.tasks.length + 1 };
        if (column) {
          column.tasks.push(task);
        }
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.board.columns = [...state.board.columns, { ...action.payload, tasks: [] }];
      })
      .addCase(createColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { columnId } = action.payload;
        const id = state.modalData.taskId;
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
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.isLoading = false;
        const { columnId, taskId } = state.modalData;
        state.board.columns = state.board.columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            };
          } else {
            return column;
          }
        });
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(deleteColumn.fulfilled, (state) => {
        state.isLoading = false;
        state.board.columns = state.board.columns.filter(
          (column) => column.id !== state.modalData.columnId
        );
      })
      .addCase(deleteColumn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      })
      .addCase(updateColumnTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.board.columns = state.board.columns.map((column) => {
          if (column.id === action.payload.id) {
            return { ...action.payload, tasks: column.tasks };
          } else {
            return column;
          }
        });
      })
      .addCase(updateColumnTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColumnTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error';
      });
    // .addCase(updateMoveColumn.fulfilled, (state, action) => {
    // state.isLoading = false;
    // })
    // .addCase(updateMoveTask.fulfilled, (state, action) => {
    // state.isLoading = false;
    // });
  },
});

export const {
  setIsLoading,
  setModal,
  setModalDataColumnId,
  setModalDataTaskId,
  setEditTitleColumnId,
  setColumnsInBoard,
  setEditTask,
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
    await Tasks.deleteTask({
      boardId: boardId,
      columnId: columnId,
      taskId: taskId,
    });
  }
);

export const deleteColumn = createAsyncThunk(
  'board/deleteColumn',
  async ({ boardId, columnId }: deleteColumnRequest) => {
    await Columns.deleteColumn({
      boardId: boardId,
      columnId: columnId,
    });
    // return response;
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
