import { SERVER } from 'constants/Server';
import { api } from './apiCreate';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import axios from 'axios';
import { SERVER, METHOD } from '../constants';
import { RootState } from '../store';
import { GetUserResponse, UpdateUserResponse, UserQuery } from './User.types';
import { getHeaders } from 'services';
import { UserData } from 'store/user';
import {
  deleteUserByIdRequest,
  getAllUsersAnswer,
  getUserByIdAnswer,
  getUserByIdRequest,
  updateUserByIdAnswer,
  updateUserByIdRequest,
} from './types/Users.types';


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


export class Users {
  static async getAllUsers() {
    try {
      const response = await api.get<getAllUsersAnswer>(SERVER.USERS);
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all users');
    }
  }

  static async getUserById({ userId }: getUserByIdRequest) {
    try {
      const response = await api.get<getUserByIdAnswer>(`${SERVER.USERS}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error while getting user');
    }
  }

  static async updateUserById({ userId, body }: updateUserByIdRequest) {
    try {
      const response = await api.put<updateUserByIdAnswer>(`${SERVER.USERS}/${userId}`, body);
      return response.data;
    } catch (error) {
      throw new Error('Error while updating user');
    }
  }

  static async deleteUserById({ userId }: deleteUserByIdRequest) {
    try {
      const response = await api.delete<undefined>(`${SERVER.USERS}/${userId}`);
      return response;
    } catch (error) {
      throw new Error('Error while deleting user');
    }
  }
}
