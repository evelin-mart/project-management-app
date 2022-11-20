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
    try {
      const response = await this.api.get<getAllTasksAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all tasks');
    }
  }

  static async createTask({ boardId, columnId, body }: createTaskRequest) {
    try {
      const response = await this.api.post<createTaskAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
        body
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while creating task');
    }
  }

  static async getTask({ boardId, columnId, taskId }: getTaskRequest) {
    try {
      const response = await this.api.get<getTaskAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting task');
    }
  }

  static async updateTask({ boardId, columnId, taskId, body }: updateTaskRequest) {
    try {
      const response = await this.api.put<updateTaskAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
        body
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while updating task');
    }
  }

  static async deleteTask({ boardId, columnId, taskId }: deleteTaskRequest) {
    try {
      const response = await this.api.delete<undefined>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while deleting task');
    }
  }
}
