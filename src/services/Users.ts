import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import axios from 'axios';
import { SERVER, METHOD } from '../constants';
import { RootState } from '../store';
import { GetUserResponse, UpdateUserResponse, UserQuery } from './User.types';
import { getHeaders } from 'services';
import { UserData } from 'store/user';

export const api = axios.create({
  baseURL: SERVER.BASE_LINK,
});

export const getUserById = async ({ id, token }: UserQuery) => {
  const response = await api.get<GetUserResponse>(`${SERVER.USERS}/${id}`, {
    headers: getHeaders(token),
  });
  const { name, login } = response.data;
  return { name, login };
};

export const updateUserById = async ({ id, token, ...body }: UserData) => {
  const response = await api.put<UpdateUserResponse>(`${SERVER.USERS}/${id}`, body, {
    headers: getHeaders(token),
  });
  const { name, login } = response.data;
  return { name, login, id };
};

export const deleteUserById = async ({ id, token }: UserQuery) => {
  await api.delete<void>(`${SERVER.USERS}/${id}`, {
    headers: getHeaders(token),
  });
  return;
};

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
