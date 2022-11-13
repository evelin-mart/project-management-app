import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

export const boardsAPI = createApi({
  reducerPath: 'boardsAPI',
  tagTypes: ['Board'],
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
    getAllBoards: build.query({
      query: () => {
        return {
          url: SERVER.BOARDS,
          method: METHOD.GET,
        };
      },
      providesTags: () => ['Board'],
    }),
    createBoard: build.mutation({
      query: (body) => {
        return {
          url: SERVER.BOARDS,
          method: METHOD.POST,
          body: body,
        };
      },
      invalidatesTags: () => ['Board'],
    }),
    getBoardById: build.query({
      query: (boardId) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}`,
          method: METHOD.GET,
        };
      },
    }),
    updateBoardById: build.mutation({
      query: ({ boardId, body }) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}`,
          method: METHOD.PUT,
          body: body,
        };
      },
      invalidatesTags: () => ['Board'],
    }),
    deleteBoardById: build.mutation({
      query: (boardId) => {
        return {
          url: `${SERVER.BOARDS}/${boardId}`,
          method: METHOD.DELETE,
        };
      },
      invalidatesTags: () => ['Board'],
    }),
    getBoardsByIdsList: build.query({
      query: (ids) => {
        return {
          url: `${SERVER.BOARDS_SET}`,
          method: METHOD.GET,
          params: {
            ids: ids,
          },
        };
      },
    }),
    getBoardsByUserId: build.query({
      query: (ids) => {
        return {
          url: `${SERVER.BOARDS_SET}`,
          method: METHOD.GET,
          params: {
            ids: ids,
          },
        };
      },
    }),
  }),
});
