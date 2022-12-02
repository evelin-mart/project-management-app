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
    const response = await this.api.get<getAllColumnsAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`
    );
    return response.data;
  }

  static async createColumn({ boardId, body }: createColumnRequest) {
    const response = await this.api.post<createColumnAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
      body
    );
    return response.data;
  }

  static getColumn = async ({ boardId, columnId }: getColumnRequest) => {
    const response = await this.api.get<getBoardAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
    );
    return response.data;
  };

  static async updateColumn({ boardId, columnId, body }: updateColumnRequest) {
    const response = await this.api.put<updateColumnAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
      body
    );
    return response.data;
  }

  static async deleteColumn({ boardId, columnId }: deleteColumnRequest) {
    const response = await this.api.delete<undefined>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
    );
    return response;
  }
}
