import { getBoardAnswer } from 'services/types/Board.types';
import { User } from 'services/types/Users.types';

export interface BoardStore {
  board: getBoardAnswer;
  users: User[];
  isLoading: boolean;
  modal: string;
  modalData: {
    columnId: string;
    taskId: string;
  };
  editTitleColumnId: string;
  error: string;
  editTask: {
    title: string;
    description: string;
    userId: string;
  };
}

export type BoardsState = Array<BoardStore>;
