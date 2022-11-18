import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SERVER } from '../constants';
import {
  DecodedTokenData,
  SignInAnswer,
  SignInQuery,
  SignUpAnswer,
  SignUpQuery,
} from './Auth.types';

export const api = axios.create({
  baseURL: SERVER.BASE_LINK,
});

export const signUp = async (query: SignUpQuery) => {
  const response = await api.post<SignUpAnswer>(SERVER.SIGNUP, query);
  const { id } = response.data;
  const { login, password } = query;
  const { token, iat } = await signIn({ login, password });

  return { id, ...query, token, iat };
};

export const signIn = async (query: SignInQuery) => {
  const response = await api.post<SignInAnswer>(SERVER.SIGNIN, query);
  const { token } = response.data;
  const { userId, login, iat } = jwt_decode<DecodedTokenData>(token);

  return { id: userId, login, token, iat };
};
