import { SERVER } from 'constants/Server';
import { api } from './apiCreate';
import {
  createColumnAnswer,
  createColumnRequest,
  deleteColumnRequest,
  getAllColumnsAnswer,
  getAllColumnsRequest,
  getBoardAnswer,
  getColumnRequest,
  updateColumnAnswer,
  updateColumnRequest,
} from './types/Columns.types';

export class Columns {
  static async getAllColumns({ boardId }: getAllColumnsRequest) {
    try {
      const response = await api.get<getAllColumnsAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all columns');
    }
  }

  static async createColumn({ boardId, body }: createColumnRequest) {
    try {
      const response = await api.post<createColumnAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
        body
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while creating column');
    }
  }

  static getColumn = async ({ boardId, columnId }: getColumnRequest) => {
    try {
      const response = await api.get<getBoardAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting column');
    }
  };

  static async updateColumn({ boardId, columnId, body }: updateColumnRequest) {
    try {
      const response = await api.put<updateColumnAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
        body
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while updating column');
    }
  }

  static async deleteColumn({ boardId, columnId }: deleteColumnRequest) {
    try {
      const response = await api.delete<undefined>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
      );
      return response;
    } catch (error) {
      throw new Error('Error while deleting column');
    }
  }
}
