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
    const response = await api.get<getAllColumnsAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`
    );
    return response.data;
  }

  static async createColumn({ boardId, body }: createColumnRequest) {
    const response = await api.post<createColumnAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}`,
      body
    );
    return response.data;
  }

  static getColumn = async ({ boardId, columnId }: getColumnRequest) => {
    const response = await api.get<getBoardAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
    );
    return response.data;
  };

  static async updateColumn({ boardId, columnId, body }: updateColumnRequest) {
    const response = await api.put<updateColumnAnswer>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`,
      body
    );
    return response.data;
  }

  static async deleteColumn({ boardId, columnId }: deleteColumnRequest) {
    const response = await api.delete<undefined>(
      `${SERVER.BOARDS}/${boardId}/${SERVER.COLUMNS}/${columnId}`
    );
    return response.data;
  }
}
