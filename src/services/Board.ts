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
import { api } from './apiCreate';

export class Board {
  static getAllBoards = async () => {
    try {
      const response = await api.get<getAllBoardsAnswer>(SERVER.BOARDS);
      return response.data;
    } catch (error) {
      throw new Error('Error while getting all boards');
    }
  };

  static createBoard = async ({ body }: createBoardRequest) => {
    try {
      const response = await api.post<createBoardAnswer>(SERVER.BOARDS, body);
      return response.data;
    } catch (error) {
      throw new Error('Error while creating board');
    }
  };

  static getBoard = async ({ boardId }: getBoardRequest) => {
    try {
      const response = await api.get<getBoardAnswer>(`${SERVER.BOARDS}/${boardId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error while getting board');
    }
  };

  static updateBoard = async ({ boardId, body }: updateBoardRequest) => {
    try {
      const response = await api.put<updateBoardAnswer>(`${SERVER.BOARDS}/${boardId}`, body);
      return response.data;
    } catch (error) {
      throw new Error('Error while updating board');
    }
  };

  static deleteBoard = async ({ boardId }: deleteBoardRequest) => {
    try {
      const response = await api.delete<undefined>(`${SERVER.BOARDS}/${boardId}`);
      return response;
    } catch (error) {
      throw new Error('Error while deleting board');
    }
  };
}
