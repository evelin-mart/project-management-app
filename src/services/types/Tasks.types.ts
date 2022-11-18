export interface getAllTasksRequest {
  boardId: string;
  columnId: string;
}

export interface getAllTasksAnswer {
  [index: number]: {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
    files: {
      filename: string;
      fileSize: number;
    }[];
  };
}

export interface createTaskRequest {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    description: string;
    userId: string;
  };
}

export interface createTaskAnswer {
  id: string;
  title: string;
  description: string;
  userId: string;
}

export interface getTaskRequest {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface getTaskAnswer {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: {
    filename: string;
    fileSize: number;
  }[];
}

export interface updateTaskRequest {
  boardId: string;
  columnId: string;
  taskId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
}

export interface updateTaskAnswer {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface deleteTaskRequest {
  boardId: string;
  columnId: string;
  taskId: string;
}
