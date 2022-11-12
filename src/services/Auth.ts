import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SERVER } from 'constants/Server';
import { METHOD } from 'constants/Methods';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER.BASE_LINK,
  }),
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => {
        return {
          url: SERVER.SIGNIN,
          method: METHOD.POST,
          body: data,
        };
      },
    }),
    signUp: build.mutation({
      query: (data) => {
        return {
          url: SERVER.SIGNUP,
          method: METHOD.POST,
          body: data,
        };
      },
    }),
  }),
});
