import { SERVER } from 'constants/Server';
import { BaseService } from './BaseService';
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

export class Columns extends BaseService {
  static async getAllColumns({ boardId }: getAllColumnsRequest) {
    try {
      const response = await this.api.get<getAllColumnsAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all columns');
    }
  }

  static async createColumn({ boardId, body }: createColumnRequest) {
    try {
      const response = await this.api.post<createColumnAnswer>(
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
      const response = await this.api.get<getBoardAnswer>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error while getting column');
    }
  };

  static async updateColumn({ boardId, columnId, body }: updateColumnRequest) {
    try {
      const response = await this.api.put<updateColumnAnswer>(
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
      const response = await this.api.delete<undefined>(
        `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
      );
      return response;
    } catch (error) {
      throw new Error('Error while deleting column');
    }
  }
}
