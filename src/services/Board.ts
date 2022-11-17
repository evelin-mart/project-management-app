import { SERVER } from 'constants/Server';
import { Response } from './types';
import {
  createBoardAnswer,
  createBoardRequest,
  deleteBoardByIdRequest,
  getAllBoardsAnswer,
  getBoardByIdAnswer,
  getBoardByIdRequest,
  updateBoardByIdAnswer,
  updateBoardByIdRequest,
} from './Board.types';
import { api } from './apiCreate';

export class Board {
  static getAllBoards = async () => {
    const response = await api.get<Response<getAllBoardsAnswer>>(SERVER.BOARDS);
    return response.data;
  };

  static createBoard = async ({ body }: createBoardRequest) => {
    const response = await api.post<createBoardAnswer>(SERVER.BOARDS, body);
    return response.data;
  };

  static getBoardById = async ({ boardId }: getBoardByIdRequest) => {
    const response = await api.get<Response<getBoardByIdAnswer>>(`${SERVER.BOARDS}/${boardId}`);
    return response.data;
  };

  static updateBoardById = async ({ boardId, body }: updateBoardByIdRequest) => {
    const response = await api.put<Response<updateBoardByIdAnswer>>(
      `${SERVER.BOARDS}/${boardId}`,
      body
    );
    return response.data;
  };

  static deleteBoardById = async ({ boardId }: deleteBoardByIdRequest) => {
    const response = await api.delete(`${SERVER.BOARDS}/${boardId}`);
    return response.data;
  };
}
