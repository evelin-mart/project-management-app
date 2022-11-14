import axios from 'axios';
import { SERVER } from '../constants';

export const api = axios.create({
  baseURL: SERVER.BASE_LINK,
});
