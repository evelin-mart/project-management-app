export interface SignInQuery {
  login: string;
  password: string;
}

export interface SignInAnswer {
  token: string;
}

export interface SignUpQuery extends SignInQuery {
  name: string;
}

export interface SignUpAnswer {
  id: string;
  name: string;
  login: string;
}

export interface DecodedTokenData {
  iat: number;
  userId: string;
  login: string;
}
