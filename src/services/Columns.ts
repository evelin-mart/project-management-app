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
      query: (boardId: string) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
          method: METHOD.GET,
        };
      },
      providesTags: () => ['Column'],
    }),
    createColumn: build.mutation({
      query: ({ boardId, body }: { boardId: string; body: { title: string; order: number } }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
          method: METHOD.POST,
          body: body,
        };
      },
      invalidatesTags: () => ['Column'],
    }),
    getColumnById: build.query({
      query: ({ boardId, columnId }: { boardId: string; columnId: string }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
          method: METHOD.GET,
        };
      },
    }),
    updateColumnById: build.mutation({
      query: ({
        boardId,
        columnId,
        body,
      }: {
        boardId: string;
        columnId: string;
        body: { title: string; order: number };
      }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
          method: METHOD.PUT,
          body: body,
        };
      },
      invalidatesTags: () => ['Column'],
    }),
    deleteColumnById: build.mutation({
      query: ({ boardId, columnId }: { boardId: string; columnId: string }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
          method: METHOD.DELETE,
        };
      },
      invalidatesTags: () => ['Column'],
    }),
    getColumnsByIdsListOrUserId: build.query({
      query: (query: string) => {
        return {
          url: `${SERVER.COLUMNS_SET}?${query}`,
          method: METHOD.GET,
        };
      },
    }),
    updateSetOfColumns: build.mutation({
      query: (body: { _id: string; order: number }) => {
        return {
          url: `${SERVER.COLUMNS_SET}`,
          method: METHOD.PATCH,
          body: body,
        };
      },
    }),
    createSetOfColumns: build.mutation({
      query: (body: { title: string; order: number; boardId: string }[]) => {
        return {
          url: `${SERVER.COLUMNS_SET}`,
          method: METHOD.POST,
          body: body,
        };
      },
    }),
  }),
});
