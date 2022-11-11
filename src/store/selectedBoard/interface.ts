import { BoardData } from "store/boards";

export interface ColumnData {
  id: string;
  title: string;
  order: number;
  tasks: Array<TaskData>;
}

export interface TaskData {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface selectedBoardState extends BoardData {
  columns: ColumnData;
};
