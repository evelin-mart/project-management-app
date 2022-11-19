interface ColumnData {
  id: string;
  title: string;
  order: number;
}

export interface getAllColumnsRequest {
  boardId: string;
}

export interface getAllColumnsAnswer {
  [index: number]: ColumnData;
}

export interface createColumnRequest {
  boardId: string;
  body: {
    title: string;
  };
}

export type createColumnAnswer = ColumnData;

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

export type updateColumnAnswer = ColumnData;

export interface deleteColumnRequest {
  boardId: string;
  columnId: string;
}
