import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { AUTH, SERVER } from 'constants/server';

export const AuthAPI = createApi({
  reducerPath: 'SignIn',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER.BASE_LINK,
  }),
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data) => {
        return {
          url: AUTH.SIGNIN,
          method: 'POST',
          body: data,
        };
      },
    }),
    signUp: build.mutation({
      query: (data) => {
        return {
          url: AUTH.SIGNUP,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});
