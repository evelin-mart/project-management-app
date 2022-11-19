type TaskData = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};
type TaskFile = { files: { filename: string; fileSize: number }[] };

type TaskPath = { boardId: string; columnId: string; taskId: string };

export type getAllTasksRequest = {
  boardId: string;
  columnId: string;
};

export type getAllTasksAnswer = {
  [index: number]: TaskData & { id: string } & TaskFile;
};

export type createTaskRequest = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    description: string;
    userId: string;
  };
};

export type createTaskAnswer = {
  id: string;
  title: string;
  description: string;
  userId: string;
};

export type getTaskRequest = TaskPath;

export type getTaskAnswer = TaskData & { id: string } & TaskFile;

export type updateTaskRequest = TaskPath & { body: TaskData };

export type updateTaskAnswer = TaskData;

export type deleteTaskRequest = TaskPath;
