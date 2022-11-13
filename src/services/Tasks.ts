import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

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
      query: ({ boardId, columnId }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
          method: METHOD.GET,
        };
      },
      providesTags: () => ['Task'],
    }),
    createTask: build.mutation({
      query: ({ boardId, columnId, body }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
          method: METHOD.POST,
          body: body,
        };
      },
      invalidatesTags: () => ['Task'],
    }),
    getTaskById: build.query({
      query: ({ boardId, columnId, taskId }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
          method: METHOD.GET,
        };
      },
    }),
    updateTaskById: build.mutation({
      query: ({ boardId, columnId, taskId, body }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
          method: METHOD.PUT,
          body: body,
        };
      },
      invalidatesTags: () => ['Task'],
    }),
    deleteTaskById: build.mutation({
      query: ({ boardId, columnId, taskId }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
          method: METHOD.DELETE,
        };
      },
      invalidatesTags: () => ['Task'],
    }),
    getTasksByIdsListUserIdOrSearchRequest: build.query({
      query: (query) => {
        return {
          url: `${SERVER.TASKS_SET}?${query}`,
          method: METHOD.GET,
        };
      },
    }),
    updateSetOfTasks: build.mutation({
      query: (body) => {
        return {
          url: `${SERVER.TASKS_SET}`,
          method: METHOD.PATCH,
          body: body,
        };
      },
    }),
    getTasksByBoardId: build.query({
      query: (boardId) => {
        return {
          url: `${SERVER.TASKS_SET}/${boardId}`,
          method: METHOD.GET,
        };
      },
    }),
  }),
});
