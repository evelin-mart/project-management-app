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
    const response = await api.get<getAllBoardsAnswer>(SERVER.BOARDS);
    return response.data;
  };

  static createBoard = async ({ body }: createBoardRequest) => {
    const response = await api.post<createBoardAnswer>(SERVER.BOARDS, body);
    return response.data;
  };

  static getBoard = async ({ boardId }: getBoardRequest) => {
    const response = await api.get<getBoardAnswer>(`${SERVER.BOARDS}/${boardId}`);
    return response.data;
  };

  static updateBoard = async ({ boardId, body }: updateBoardRequest) => {
    const response = await api.put<updateBoardAnswer>(`${SERVER.BOARDS}/${boardId}`, body);
    return response.data;
  };

  static deleteBoard = async ({ boardId }: deleteBoardRequest) => {
    const response = await api.delete<undefined>(`${SERVER.BOARDS}/${boardId}`);
    return response;
  };
}
