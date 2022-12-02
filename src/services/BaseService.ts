import { SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER } from '../constants';

class ApiError implements SerializedError {
  public name: string;
  public message: string;
  public stack: string;
  public code: string;

  constructor(name: string, message: string, stack: string, code: string) {
    this.name = name;
    this.message = message;
    this.stack = stack;
    this.code = code;
  }
}

export class BaseService {
  static createAxios = () => {
    const instance = axios.create({
      baseURL: SERVER.BASE_LINK,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    instance.interceptors.response.use(
      (res) => res,
      (error) => {
        throw new ApiError(
          'ApiError',
          error.response.data.message || 'Something went wrong',
          error.stack,
          error.response.data.statusCode.toString()
        );
      }
    );
    return instance;
  };

  static api = BaseService.createAxios();

  static setToken(token: string) {
    this.api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}
