import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

export const columnsAPI = createApi({
  reducerPath: 'columnsAPI',
  tagTypes: ['Column'],
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
    getColumnsInBoard: build.query({
      query: (boardId) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
          method: METHOD.GET,
        };
      },
      providesTags: () => ['Column'],
    }),
    createColumn: build.mutation({
      query: ({ boardId, body }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
          method: METHOD.POST,
          body: body,
        };
      },
      invalidatesTags: () => ['Column'],
    }),
    getColumnById: build.query({
      query: ({ boardId, columnId }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
          method: METHOD.GET,
        };
      },
    }),
    updateColumnById: build.mutation({
      query: ({ boardId, columnId, body }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
          method: METHOD.PUT,
          body: body,
        };
      },
      invalidatesTags: () => ['Column'],
    }),
    deleteColumnById: build.mutation({
      query: ({ boardId, columnId }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
          method: METHOD.DELETE,
        };
      },
      invalidatesTags: () => ['Column'],
    }),
    getColumnsByIdsListOrUserId: build.query({
      query: (query) => {
        return {
          url: `${SERVER.COLUMNS_SET}?${query}`,
          method: METHOD.GET,
        };
      },
    }),
    updateSetOfColumns: build.mutation({
      query: (body) => {
        return {
          url: `${SERVER.COLUMNS_SET}`,
          method: METHOD.PATCH,
          body: body,
        };
      },
    }),
    createSetOfColumns: build.mutation({
      query: (body) => {
        return {
          url: `${SERVER.COLUMNS_SET}`,
          method: METHOD.POST,
          body: body,
        };
      },
    }),
  }),
});
