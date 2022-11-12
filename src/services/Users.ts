import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SERVER } from 'constants/Server';
import { METHOD } from 'constants/Methods';
import { RootState } from 'state/store';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER.BASE_LINK,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
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
      query: () => {
        return {
          url: SERVER.USERS,
          method: METHOD.GET,
        };
      },
    }),
    updateUserById: build.mutation({
      query: (data) => {
        return {
          url: SERVER.USERS,
          method: METHOD.PUT,
          body: data,
        };
      },
    }),
    deleteUserById: build.mutation({
      query: (data) => {
        return {
          url: SERVER.USERS,
          method: METHOD.DELETE,
          body: data,
        };
      },
    }),
  }),
});
