export interface UserData {
  id: string;
  name: string;
  login: string;
  token: string;
  iat: number;
}

export interface UserState {
  data: UserData;
  isLoading: boolean;
  error: string;
}
