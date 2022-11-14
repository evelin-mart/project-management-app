import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

interface ICreateTask {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: string[];
}

interface IUpdateTask {
  title: string;
  order: number;
  description: string;
  columnId: string;
  userId: number;
  users: string[];
}

export const tasksAPI = createApi({
  reducerPath: 'tasksAPI',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER.BASE_LINK,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.data.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getTasksInColumn: build.query({
      query: ({ boardId, columnId }: { boardId: string; columnId: string }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
          method: METHOD.GET,
        };
      },
      providesTags: () => ['Task'],
    }),
    createTask: build.mutation({
      query: ({
        boardId,
        columnId,
        body,
      }: {
        boardId: string;
        columnId: string;
        body: ICreateTask;
      }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
          method: METHOD.POST,
          body: body,
        };
      },
      invalidatesTags: () => ['Task'],
    }),
    getTaskById: build.query({
      query: ({
        boardId,
        columnId,
        taskId,
      }: {
        boardId: string;
        columnId: string;
        taskId: string;
      }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
          method: METHOD.GET,
        };
      },
    }),
    updateTaskById: build.mutation({
      query: ({
        boardId,
        columnId,
        taskId,
        body,
      }: {
        boardId: string;
        columnId: string;
        taskId: string;
        body: IUpdateTask;
      }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
          method: METHOD.PUT,
          body: body,
        };
      },
      invalidatesTags: () => ['Task'],
    }),
    deleteTaskById: build.mutation({
      query: ({
        boardId,
        columnId,
        taskId,
      }: {
        boardId: string;
        columnId: string;
        taskId: string;
      }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
          method: METHOD.DELETE,
        };
      },
      invalidatesTags: () => ['Task'],
    }),
    getTasksByIdsListUserIdOrSearchRequest: build.query({
      query: (query: string) => {
        return {
          url: `${SERVER.TASKS_SET}?${query}`,
          method: METHOD.GET,
        };
      },
    }),
    updateSetOfTasks: build.mutation({
      query: (body: { _id: string; order: number; columnId: string }[]) => {
        return {
          url: `${SERVER.TASKS_SET}`,
          method: METHOD.PATCH,
          body: body,
        };
      },
    }),
    getTasksByBoardId: build.query({
      query: (boardId: string) => {
        return {
          url: `${SERVER.TASKS_SET}/${boardId}`,
          method: METHOD.GET,
        };
      },
    }),
  }),
});
