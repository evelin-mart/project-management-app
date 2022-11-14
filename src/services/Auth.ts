import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { METHOD, SERVER } from './../constants';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER.BASE_LINK,
  }),
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body: { login: string; password: string }) => {
        return {
          url: SERVER.SIGNIN,
          method: METHOD.POST,
          body: body,
        };
      },
    }),
    signUp: build.mutation({
      query: (body: { name: string; login: string; password: string }) => {
        return {
          url: SERVER.SIGNUP,
          method: METHOD.POST,
          body: body,
        };
      },
    }),
  }),
});