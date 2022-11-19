import { SERVER } from 'constants/Server';
import { api } from './apiCreate';
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

export class Tasks {
  static async getAllTasks({ boardId, columnId }: getAllTasksRequest) {
    try {
      const response = await api.get<getAllTasksAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all tasks');
    }
  }

  static async createTask({ boardId, columnId, body }: createTaskRequest) {
    try {
      const response = await api.post<createTaskAnswer>(
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
      const response = await api.get<getTaskAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting task');
    }
  }

  static async updateTask({ boardId, columnId, taskId, body }: updateTaskRequest) {
    try {
      const response = await api.put<updateTaskAnswer>(
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
      const response = await api.delete<undefined>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while deleting task');
    }
  }
}
