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
    return response.data;
  }

  static async signIn(query: SignInQuery) {
    const response = await this.api.post<SignInAnswer>(SERVER.SIGNIN, query);
    const { token } = response.data;
    const { userId: id, login, iat: exp } = jwt_decode<DecodedTokenData>(token);
    this.setToken(token);
    return { id, login, token, exp };
  }
}
