import { api } from 'services';
import jwt_decode from 'jwt-decode';
import { SERVER } from '../constants';
import {
  DecodedTokenData,
  SignInAnswer,
  SignInQuery,
  SignUpAnswer,
  SignUpQuery,
} from './Auth.types';

export const signUp = async (query: SignUpQuery) => {
  const response = await api.post<SignUpAnswer>(SERVER.SIGNUP, { ...query });
  const { id } = response.data;
  const token = await signIn(query);

  return { id, ...query, token };
};

export const signIn = async (query: SignInQuery) => {
  const response = await api.post<SignInAnswer>(SERVER.SIGNIN, { ...query });
  const { token } = response.data;
  const { id, login, exp } = jwt_decode(token) as DecodedTokenData;

  return {id, login, token, exp};
};
