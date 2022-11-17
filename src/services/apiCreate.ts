import axios from 'axios';
import { SERVER } from 'constants/Server';
import { store } from 'store';

export const api = axios.create({
  baseURL: SERVER.BASE_LINK,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${store.getState().user.data.token}`,
  },
});
