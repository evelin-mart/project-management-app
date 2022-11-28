import { SERVER } from '../constants';
import {
  GetUserRequest,
  GetUserResponse,
  GetAllUsersAnswer,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
} from './types/Users.types';
import { BaseService } from './BaseService';

export class Users extends BaseService {
  static async getUserById({ id }: GetUserRequest) {
    const response = await this.api.get<GetUserResponse>(`${SERVER.USERS}/${id}`);
    const { name, login } = response.data;
    return { name, login };
  }

  static async getAllUsers() {
    const response = await this.api.get<GetAllUsersAnswer>(SERVER.USERS);
    return response.data;
  }

  static async updateUserById({ id, ...body }: UpdateUserRequest) {
    const response = await this.api.put<UpdateUserResponse>(`${SERVER.USERS}/${id}`, body);
    const { name, login } = response.data;
    return { name, login, id };
  }

  static async deleteUserById({ id }: DeleteUserRequest) {
    await this.api.delete<void>(`${SERVER.USERS}/${id}`);
    return;
  }
}
