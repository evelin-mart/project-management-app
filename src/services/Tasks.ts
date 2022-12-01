import { SERVER } from 'constants/Server';
import { BaseService } from './BaseService';
import {
  createTaskAnswer,
  createTaskRequest,
  deleteTaskRequest,
  getAllTasksAnswer,
  getAllTasksRequest,
  getTaskAnswer,
  getTaskRequest,
  updateTaskAnswer,
  updateTaskRequest,
} from './types/Tasks.types';

export class Tasks extends BaseService {
  static async getAllTasks({ boardId, columnId }: getAllTasksRequest) {
    const response = await this.api.get<getAllTasksAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`
    );
    return response.data;
  }

  static async createTask({ boardId, columnId, body }: createTaskRequest) {
    const response = await this.api.post<createTaskAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
      body
    );
    return response.data;
  }

  static async getTask({ boardId, columnId, taskId }: getTaskRequest) {
    const response = await this.api.get<getTaskAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
    );
    return response.data;
  }

  static async updateTask({ boardId, columnId, taskId, body }: updateTaskRequest) {
    const response = await this.api.put<updateTaskAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
      body
    );
    return response.data;
  }

  static async deleteTask({ boardId, columnId, taskId }: deleteTaskRequest) {
    const response = await this.api.delete<undefined>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
    );
    return response.data;
  }
}
