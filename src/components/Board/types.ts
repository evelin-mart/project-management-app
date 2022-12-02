import { ColumnData } from 'services/types/Columns.types';
import { ITaskService } from 'services/types/Tasks.types';

export interface IItemButtonAddTask {
  id: string;
  index: number;
  columnId: string;
  taskId: string;
  task: {
    description: string;
    id: string;
    order: number;
    title: string;
    userId: string;
    files: [];
  };
}

export interface ITaskComponent {
  index: number;
  task: ITaskService;
  moveTask: (
    drag: { id: string; index: number; columnId: string; taskId: string; task: ITaskService },
    dropId: string
  ) => void;
  columnId: string;
}

export interface IItemTaskDrop {
  id: string;
  index: number;
  columnId: string;
  taskId: string;
  task: ITaskService;
}

export interface IItemColumnDrop {
  id: string;
  index: number;
  column: {
    id: string;
    title: string;
    tasks: ITaskService[];
    order: number;
  };
}

export interface IColumnComponent {
  column: ColumnData;
  index: number;
  id: string;
  moveColumn: (item: { id: string; index: number }) => void;
  moveTask: (
    drag: { id: string; index: number; columnId: string; taskId: string; task: ITaskService },
    dropId: string
  ) => void;
  addTaskInEmptyColumn: (
    item: {
      id: string;
      index: number;
      columnId: string;
      taskId: string;
      task: {
        description: string;
        id: string;
        order: number;
        title: string;
        userId: string;
        files: [];
      };
    },
    columnId: string
  ) => void;
}
