import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

export const pointsAPI = createApi({
  reducerPath: 'pointsAPI',
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
    getPointsByIdsListOrUserId: build.query({
      query: (query: string) => {
        return {
          url: `${SERVER.POINTS}?${query}`,
          method: METHOD.GET,
        };
      },
    }),
    createPoint: build.mutation({
      query: (body: { title: string; taskId: string; boardId: string; done: boolean }) => {
        return {
          url: `${SERVER.POINTS}`,
          method: METHOD.POST,
          body: body,
        };
      },
    }),
    updateSetOfPoints: build.mutation({
      query: (body: { _id: string; done: boolean }) => {
        return {
          url: `${SERVER.POINTS}`,
          method: METHOD.PATCH,
          body: body,
        };
      },
    }),
    getPointsByTaskId: build.query({
      query: (taskId: string) => {
        return {
          url: `${SERVER.POINTS}/${taskId}`,
          method: METHOD.GET,
        };
      },
    }),
    updatePoint: build.mutation({
      query: ({ pointId, body }: { pointId: string; body: { title: string; done: boolean } }) => {
        return {
          url: `${SERVER.POINTS}/${pointId}`,
          method: METHOD.PATCH,
          body: body,
        };
      },
    }),
    deletePointById: build.mutation({
      query: (pointId: string) => {
        return {
          url: `${SERVER.POINTS}/${pointId}`,
          method: METHOD.DELETE,
        };
      },
    }),
  }),
});
