export interface UserData {
  id: string;
  name: string;
  login: string;
  token: string;
}

export interface UserState {
  data: UserData;
  isAuth: boolean;
}
