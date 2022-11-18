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
    const response = await api.get<getAllTasksAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`
    );
    return response.data;
  }

  static async createTask({ boardId, columnId, body }: createTaskRequest) {
    const response = await api.post<createTaskAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}`,
      body
    );
    return response.data;
  }

  static async getTask({ boardId, columnId, taskId }: getTaskRequest) {
    const response = await api.get<getTaskAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
    );
    return response.data;
  }

  static async updateTask({ boardId, columnId, taskId, body }: updateTaskRequest) {
    const response = await api.put<updateTaskAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`,
      body
    );
    return response.data;
  }

  static async deleteTask({ boardId, columnId, taskId }: deleteTaskRequest) {
    const response = await api.delete<undefined>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}/${SERVER.TASKS}/${taskId}`
    );
    return response.data;
  }
}
