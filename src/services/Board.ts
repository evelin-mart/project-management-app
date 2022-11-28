import { SERVER } from 'constants/Server';
import {
  createBoardAnswer,
  createBoardRequest,
  deleteBoardRequest,
  getAllBoardsAnswer,
  getBoardAnswer,
  getBoardRequest,
  updateBoardAnswer,
  updateBoardRequest,
} from './types/Board.types';
import { BaseService } from './BaseService';

export class Board extends BaseService {
  static getAllBoards = async () => {
    try {
      const response = await this.api.get<getAllBoardsAnswer>(SERVER.BOARDS);
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all boards');
    }
  };

  static createBoard = async ({ body }: createBoardRequest) => {
    try {
      const response = await this.api.post<createBoardAnswer>(SERVER.BOARDS, body);
      return response.data;
    } catch (error) {
      throw new Error('Error while creating board');
    }
  };

  static getBoard = async ({ boardId }: getBoardRequest) => {
    try {
      const response = await this.api.get<getBoardAnswer>(`${SERVER.BOARDS}/${boardId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error while getting board');
    }
  };

  static updateBoard = async ({ boardId, body }: updateBoardRequest) => {
    try {
      const response = await this.api.put<updateBoardAnswer>(`${SERVER.BOARDS}/${boardId}`, body);
      return response.data;
    } catch (error) {
      throw new Error('Error while updating board');
    }
  };

  static deleteBoard = async ({ id }: deleteBoardRequest) => {
    try {
      const response = await this.api.delete<undefined>(`${SERVER.BOARDS}/${id}`);
      return response;
    } catch (error) {
      throw new Error('Error while deleting board');
    }
  };
}
