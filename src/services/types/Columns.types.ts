import { ITaskService } from './Tasks.types';

export type ColumnData = {
  id: string;
  title: string;
  order: number;
  tasks: ITaskService[];
};

export type getAllColumnsRequest = {
  boardId: string;
};

export type getAllColumnsAnswer = {
  [index: number]: ColumnData;
};

export type createColumnRequest = {
  boardId: string;
  body: {
    title: string;
  };
};

export type createColumnAnswer = ColumnData;

export type getColumnRequest = {
  boardId: string;
  columnId: string;
};

export type getBoardAnswer = ColumnData & {
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
};

export type updateColumnRequest = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
  };
};

export type updateColumnAnswer = ColumnData;

export type deleteColumnRequest = {
  boardId: string;
  columnId: string;
};
