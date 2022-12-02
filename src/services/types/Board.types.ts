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

export type getBoardAnswer = {
  id: string;
  title: string;
  description: string;
  columns: {
    id: string;
    title: string;
    order: number;
    tasks: {
      id: string;
      title: string;
      order: number;
      description: string;
      userId: string;
      files?: { filename?: string; fileSize?: number }[];
    }[];
  }[];
};

export interface IBoardService {
  id: string;
  title: string;
  description: string;
  columns: {
    id: string;
    title: string;
    order: number;
    tasks: {
      id: string;
      title: string;
      order: number;
      description: string;
      userId: string;
      files: { filename: string; fileSize: number }[];
    }[];
  }[];
}

export type getBoardRequest = {
  boardId: string;
};

export type updateBoardRequest = {
  boardId: string;
  body: { title: string; description: string };
};

export type updateBoardAnswer = BoardData;

export type deleteBoardRequest = { id: string };
