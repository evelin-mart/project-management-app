import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

export const fileAPI = createApi({
  reducerPath: 'fileAPI',
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
    getFileByIdsListUserIdTaskId: build.query({
      query: (query: string) => {
        return {
          url: `${SERVER.FILE}?${query}`,
          method: METHOD.GET,
        };
      },
    }),
    uploadFile: build.mutation({
      query: (formData: FormData) => {
        return {
          url: `${SERVER.FILE}`,
          method: METHOD.POST,
          credentials: 'include',
          body: formData,
        };
      },
    }),
    getFilesByBoardId: build.query({
      query: (boardId: string) => {
        return {
          url: `${SERVER.FILE}/${boardId}`,
          method: METHOD.GET,
        };
      },
    }),
    deleteFileById: build.mutation({
      query: (boardId: string) => {
        return {
          url: `${SERVER.FILE}/${boardId}`,
          method: METHOD.DELETE,
        };
      },
    }),
  }),
});
