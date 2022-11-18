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
    const response = await api.get<getAllUsersAnswer>(SERVER.USERS);
    return response.data;
  }

  static async getUserById({ userId }: getUserByIdRequest) {
    const response = await api.get<getUserByIdAnswer>(`${SERVER.USERS}/${userId}`);
    return response.data;
  }

  static async updateUserById({ userId, body }: updateUserByIdRequest) {
    const response = await api.put<updateUserByIdAnswer>(`${SERVER.USERS}/${userId}`, body);
    return response.data;
  }

  static async deleteUserById({ userId }: deleteUserByIdRequest) {
    const response = await api.delete<undefined>(`${SERVER.USERS}/${userId}`);
    return response;
  }
}
