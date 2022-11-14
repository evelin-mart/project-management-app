import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';
import { RootState } from 'store';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  tagTypes: ['User'],
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
    getAllUsers: build.query({
      query: () => {
        return {
          url: SERVER.USERS,
          method: METHOD.GET,
        };
      },
    }),
    getUserById: build.query({
      query: (userId: string) => {
        return {
          url: `${SERVER.USERS}/${userId}`,
          method: METHOD.GET,
        };
      },
      providesTags: () => ['User'],
    }),
    updateUserById: build.mutation({
      query: ({
        userId,
        body,
      }: {
        userId: string;
        body: { name: string; login: string; password: string };
      }) => {
        return {
          url: `${SERVER.USERS}/${userId}`,
          method: METHOD.PUT,
          body: body,
        };
      },
      invalidatesTags: () => ['User'],
    }),
    deleteUserById: build.mutation({
      query: (userId: string) => {
        return {
          url: `${SERVER.USERS}/${userId}`,
          method: METHOD.DELETE,
        };
      },
    }),
  }),
});
