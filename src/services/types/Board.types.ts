export interface getAllBoardsAnswer {
  [index: number]: { id: string; title: string; description: string };
}

export interface createBoardAnswer {
  id: string;
  title: string;
  description: string;
}

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

export interface updateBoardAnswer {
  id: string;
  title: string;
  description: string;
}

export interface deleteBoardRequest {
  boardId: string;
}
