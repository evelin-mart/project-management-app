import axios from 'axios';
import { SERVER } from '../constants';

export class BaseService {
  static api = axios.create({
    baseURL: SERVER.BASE_LINK,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  static setToken(token: string) {
    BaseService.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
