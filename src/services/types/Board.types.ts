interface BoardData {
  id: string;
  title: string;
  description: string;
}

export interface getAllBoardsAnswer {
  [index: number]: BoardData;
}

export type createBoardAnswer = BoardData;

export interface createBoardRequest {
  body: { title: string; description: string };
}

export interface getBoardAnswer {
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

export interface getBoardRequest {
  boardId: string;
}

export interface updateBoardRequest {
  boardId: string;
  body: { title: string; description: string };
}

export type updateBoardAnswer = BoardData;

export interface deleteBoardRequest {
  boardId: string;
}
