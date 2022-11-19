import { SERVER } from 'constants/Server';
import { api } from './apiCreate';
import {
  deleteUserByIdRequest,
  getAllUsersAnswer,
  getUserByIdAnswer,
  getUserByIdRequest,
  updateUserByIdAnswer,
  updateUserByIdRequest,
} from './types/Users.types';

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
