import { UserData } from 'store/user';

export type UserQuery = Pick<UserData, 'id' | 'token'>;

export type UpdateUserQuery = Extract<UserData & { password: string }, UserQuery>;

export type GetUserResponse = Omit<UserData, 'exp' | 'token'>;

export type UpdateUserResponse = GetUserResponse;
