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
    const response = await this.api.get<getAllBoardsAnswer>(SERVER.BOARDS);
    return response.data;
  };

  static createBoard = async ({ body }: createBoardRequest) => {
    const response = await this.api.post<createBoardAnswer>(SERVER.BOARDS, body);
    return response.data;
  };

  static getBoard = async ({ boardId }: getBoardRequest) => {
    const response = await this.api.get<getBoardAnswer>(`${SERVER.BOARDS}/${boardId}`);
    return response.data;
  };

  static updateBoard = async ({ boardId, body }: updateBoardRequest) => {
    const response = await this.api.put<updateBoardAnswer>(`${SERVER.BOARDS}/${boardId}`, body);
    return response.data;
  };

  static deleteBoard = async ({ id }: deleteBoardRequest) => {
    const response = await this.api.delete<undefined>(`${SERVER.BOARDS}/${id}`);
    return response;
  };
}
