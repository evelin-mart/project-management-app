import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { SERVER } from '../constants';
import {
  DecodedTokenData,
  SignInAnswer,
  SignInQuery,
  SignUpAnswer,
  SignUpQuery,
} from './types/Auth.types';

export const api = axios.create({
  baseURL: SERVER.BASE_LINK,
});

export const signUp = async (query: SignUpQuery) => {
  try {
    const response = await api.post<SignUpAnswer>(SERVER.SIGNUP, { ...query });
    const { id } = response.data;
    const { login, password } = query;
    const { token, exp } = await signIn({ login, password });
    return { id, ...query, token, exp };
  } catch (error) {
    throw new Error('Error while signing up');
  }
};

export const signIn = async (query: SignInQuery) => {
  try {
    const response = await api.post<SignInAnswer>(SERVER.SIGNIN, { ...query });
    const { token } = response.data;
    const { userId: id, login, iat: exp } = jwt_decode<DecodedTokenData>(token);

    return { id, login, token, exp };
  } catch (error) {
    throw new Error('Error while signing in');
  }
};
