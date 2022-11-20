type User = {
  id: string;
  name: string;
  login: string;
};

type BaseUserRequest = Pick<User, 'id'>;

export type GetUserRequest = BaseUserRequest;

export type GetUserResponse = User;

export type UpdateUserRequest = Extract<User & { password: string }, BaseUserRequest>;

export type UpdateUserResponse = User;

export type DeteleUserRequest = BaseUserRequest;

export type GetAllUsersAnswer = User[];
