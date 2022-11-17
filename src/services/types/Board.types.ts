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

export interface getBoardByIdAnswer {
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

export interface getBoardByIdRequest {
  boardId: string;
}

export interface updateBoardByIdAnswer {
  id: string;
  title: string;
  description: string;
}

export interface updateBoardByIdRequest {
  boardId: string;
  body: { title: string; description: string };
}

export interface deleteBoardByIdRequest {
  boardId: string;
}

