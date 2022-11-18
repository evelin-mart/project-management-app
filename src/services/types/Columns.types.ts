export interface getAllColumnsRequest {
  boardId: string;
}

export interface getAllColumnsAnswer {
  [index: number]: {
    id: string;
    title: string;
    order: number;
  };
}

export interface createColumnRequest {
  boardId: string;
  body: {
    title: string;
  };
}

export interface createColumnAnswer {
  id: string;
  title: string;
  order: number;
}

export interface getColumnRequest {
  boardId: string;
  columnId: string;
}

export interface getBoardAnswer {
  id: string;
  title: string;
  order: number;
  tasks: {
    id: string;
    title: string;
    order: number;
    done: boolean;
    description: string;
    userId: string;
    files: {
      filename: string;
      fileSize: number;
    }[];
  }[];
}

export interface updateColumnRequest {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
  };
}

export interface updateColumnAnswer {
  id: string;
  title: string;
  order: number;
}

export interface deleteColumnRequest {
  boardId: string;
  columnId: string;
}
