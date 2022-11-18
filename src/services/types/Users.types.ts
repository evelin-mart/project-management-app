export interface getAllUsersAnswer {
  [index: number]: { id: string; name: string; login: string };
}

export interface getUserByIdRequest {
  userId: string;
}

export interface getUserByIdAnswer {
  id: string;
  name: string;
  login: string;
}

export interface updateUserByIdRequest {
  userId: string;
  body: { name: string; login: string; password: string };
}

export interface updateUserByIdAnswer {
  id: string;
  name: string;
  login: string;
}

export interface deleteUserByIdRequest {
  userId: string;
}
