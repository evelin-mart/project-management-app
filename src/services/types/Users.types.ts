type UserData = {
  id: string;
  name: string;
  login: string;
};

export type getAllUsersAnswer = {
  [index: number]: UserData;
};

export type getUserByIdRequest = {
  userId: string;
};

export type getUserByIdAnswer = UserData;

export type updateUserByIdRequest = {
  userId: string;
  body: { name: string; login: string; password: string };
};

export type updateUserByIdAnswer = UserData;

export type deleteUserByIdRequest = {
  userId: string;
};
