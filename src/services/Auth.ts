import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  DecodedTokenData,
  SignInAnswer,
  SignInQuery,
  SignUpAnswer,
  SignUpQuery,
} from './Auth.types';
import { SERVER } from '../constants';
import { getUserById } from 'services';

const api = axios.create({
  baseURL: SERVER.BASE_LINK,
});

export const signUp = async (query: SignUpQuery) => {
  const response = await api.post<SignUpAnswer>(SERVER.SIGNUP, { ...query });
  const { id } = response.data;
  const { login, password } = query;
  const { token, exp } = await signIn({ login, password });

  return { id, ...query, token, exp };
};

export const signIn = async (query: SignInQuery) => {
  const response = await api.post<SignInAnswer>(SERVER.SIGNIN, { ...query });
  const { token } = response.data;
  const { userId: id, login, iat: exp } = jwt_decode<DecodedTokenData>(token);
  const { name } = await getUserById({ id, token });

  return { id, login, name, token, exp };
};
