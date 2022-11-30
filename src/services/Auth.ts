import jwt_decode from 'jwt-decode';
import {
  DecodedTokenData,
  SignInAnswer,
  SignInQuery,
  SignUpAnswer,
  SignUpQuery,
} from './types/Auth.types';
import { SERVER } from '../constants';
import { BaseService } from './BaseService';

export class Auth extends BaseService {
  static async signUp(query: SignUpQuery) {
    const response = await this.api.post<SignUpAnswer>(SERVER.SIGNUP, query);
    const { id } = response.data;
    const { login, password } = query;
    const { token, iat } = await this.signIn({ login, password });

    return { id, ...query, token, iat };
  }
  static async signIn(query: SignInQuery) {
    const response = await this.api.post<SignInAnswer>(SERVER.SIGNIN, query);
    const { token } = response.data;
    const { userId, login, iat } = jwt_decode<DecodedTokenData>(token);
    this.setToken(token);

    return { id: userId, login, token, iat };
  }
}
