import { ColumnData } from './Columns.types';

type BoardData = {
  id: string;
  title: string;
  description: string;
};

export type getAllBoardsAnswer = BoardData[];

export type createBoardAnswer = BoardData;

export type createBoardRequest = {
  body: { title: string; description: string };
};

export type getBoardAnswer = BoardData & {
  columns: ColumnData &
    {
      tasks: {
        id: string;
        title: string;
        order: number;
        description: string;
        userId: string;
        files: { filename: string; fileSize: number }[];
      }[];
    }[];
};

export type getBoardRequest = {
  boardId: string;
};

export type updateBoardRequest = {
  boardId: string;
  body: { title: string; description: string };
};

export type updateBoardAnswer = BoardData;

export type deleteBoardRequest = { boardId: string };
